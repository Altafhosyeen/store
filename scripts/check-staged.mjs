#!/usr/bin/env node
/**
 * Architecture checker.
 *
 * Deterministic and conservative by design: it blocks known architectural
 * violations with plain path/text rules instead of trying to understand
 * arbitrary JavaScript. A rule that cannot be decided from the file path and
 * its raw text does not belong here.
 */
import { readFileSync } from "node:fs";

const MAX_FILE_LINES = 400;

/**
 * Suffixes that make a dotted string a file name rather than a permission, so
 * "index.ts" is not reported as a hardcoded "index" permission.
 */
const FILE_EXTENSIONS = new Set([
  "ts",
  "tsx",
  "js",
  "jsx",
  "mjs",
  "cjs",
  "json",
  "css",
  "scss",
  "html",
  "md",
  "svg",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "ico",
  "woff",
  "woff2",
  "txt",
  "yml",
  "yaml",
  "lock",
  "env",
  "map",
]);

const toPosix = (filePath) => filePath.replaceAll("\\", "/");

/** features/<name>/... -> <name>; null for anything outside a feature module. */
const featureOf = (filePath) => {
  const match = /(?:^|\/)src\/features\/([^/]+)\//.exec(filePath);
  return match ? match[1] : null;
};

const isTestFile = (filePath) => /\.(test|spec)\.[jt]sx?$/.test(filePath);

/**
 * Blanks out comments so prose that merely mentions `fetch(` or `localStorage`
 * is not reported as a call. Rules that inspect comments on purpose (the
 * commented-out-code rule) use the raw source instead.
 */
const stripComments = (source) =>
  source.replaceAll(/\/\*[\s\S]*?\*\//g, "").replaceAll(/(^|[^:])\/\/[^\n]*/g, "$1");

const rules = [
  {
    id: "cross-feature-deep-import",
    // A feature may import another public API (index.ts) but never reach into
    // internals, which would freeze that module file layout.
    check: (filePath, source) => {
      const currentFeature = featureOf(filePath);
      if (!currentFeature) return [];

      const violations = [];
      const importPattern = /from\s+["'](@\/features\/([^/"']+)\/([^"']*))["']/g;
      for (const match of source.matchAll(importPattern)) {
        const [, specifier, otherFeature, rest] = match;
        if (otherFeature === currentFeature) continue;
        if (rest === "" || rest === "index" || rest === "index.ts") continue;
        violations.push(
          `imports an internal file of another feature: ${specifier} (import from "@/features/${otherFeature}" instead)`,
        );
      }
      return violations;
    },
  },
  {
    id: "shared-imports-feature",
    // Shared layers must not depend on business features; the arrow only ever
    // points features -> shared, otherwise shared code cannot be reused.
    check: (filePath, source) => {
      const isShared =
        /(?:^|\/)src\/(components|constants|hooks|lib|services|navigation|permissions|types)\//.test(
          filePath,
        );
      if (!isShared) return [];
      return source.includes("@/features/")
        ? ["shared module imports a business feature (@/features/...)"]
        : [];
    },
  },
  {
    id: "roles-permissions-outside-constants",
    // Role/permission values are centralized so authorization stays auditable.
    check: (filePath, source) => {
      if (filePath.includes("src/constants/")) return [];
      const violations = [];
      if (/(export\s+)?const\s+(USER_ROLES|PERMISSIONS|ROLE_PERMISSIONS)\s*=/.test(source)) {
        violations.push("declares role/permission constants outside src/constants/");
      }
      // Matched by shape ("<domain>.<action>"), not against a list of known
      // domains: a rule that has to be edited whenever a permission is added is
      // a rule that silently stops covering the newest ones. File names and
      // module specifiers share that shape, so extension-like suffixes and
      // anything inside an import/require are excluded instead.
      const withoutImports = stripComments(source)
        .replaceAll(/^\s*import[^;]*?;/gm, "")
        .replaceAll(/^\s*export\s+(?:\*|\{[^}]*\})\s+from[^;]*?;/gm, "")
        .replaceAll(/\b(?:import|require)\s*\([^)]*\)/g, "");

      const permissionPattern = /["']([a-z][a-z0-9]*)\.([a-z][a-z0-9_]*)["']/g;
      const seen = new Set();
      for (const match of withoutImports.matchAll(permissionPattern)) {
        const [literal, , action] = match;
        // "index.ts", "styles.css": a file extension, not an action.
        if (FILE_EXTENSIONS.has(action)) continue;
        if (seen.has(literal)) continue;
        seen.add(literal);
        violations.push(
          `hardcodes a permission string ${literal}; import it from @/constants/permissions.constants`,
        );
      }
      return violations;
    },
  },
  {
    id: "magic-route-string",
    // Route paths live in routes.constants so a rename is one edit, not a grep.
    check: (filePath, source) => {
      if (filePath.includes("src/constants/")) return [];
      // A spec builds URLs the app does not serve to drive route matching
      // directly; pointing those at ROUTES would assert on the menu rather
      // than on the algorithm under test.
      if (isTestFile(filePath)) return [];
      const violations = [];
      // Any string literal that looks like an application URL, wherever it
      // appears — covers every top-level route segment this app serves.
      const routePattern = /["'`](\/(?:app|shop|cart|checkout|account|auth)(?:\/[^"'`\n]*)?)["'`]/g;
      const seen = new Set();
      for (const match of stripComments(source).matchAll(routePattern)) {
        const route = match[1];
        if (seen.has(route)) continue;
        seen.add(route);
        violations.push(`hardcodes route "${route}"; use ROUTES from @/constants/routes.constants`);
      }
      return violations;
    },
  },
  {
    id: "direct-storage-access",
    // Storage keys and serialization belong to the storage service.
    check: (filePath, source) => {
      if (filePath.includes("src/services/storage/")) return [];
      // Zustand persist middleware legitimately names a storage backend.
      const stripped = stripComments(source).replaceAll(/createJSONStorage\([^)]*\)/g, "");
      return /\b(localStorage|sessionStorage)\s*\.\s*(get|set|remove)Item/.test(stripped)
        ? ["accesses localStorage/sessionStorage directly; use @/services/storage"]
        : [];
    },
  },
  {
    id: "bypasses-api-client",
    // Every request goes through the shared client so auth, refresh and error
    // normalization apply uniformly.
    check: (filePath, source) => {
      if (/(?:^|\/)src\/services\/api\//.test(filePath)) return [];
      // The mock transport replaces the adapter underneath the shared client,
      // so it is part of that layer rather than a caller bypassing it.
      if (/(?:^|\/)src\/mocks\//.test(filePath)) return [];
      // A test may import axios error types to build fixtures; it is asserting
      // on how the client behaves, not opening a connection of its own.
      if (isTestFile(filePath)) return [];
      const violations = [];
      const code = stripComments(source);
      if (/from\s+["']axios["']/.test(code)) {
        violations.push("imports axios directly; use the shared client in @/services/api");
      }
      if (/(?<![\w.])fetch\s*\(/.test(code)) {
        violations.push("calls fetch() directly; use the shared client in @/services/api");
      }
      return violations;
    },
  },
  {
    id: "service-imported-outside-hooks",
    // components/pages -> hooks -> service -> apiClient.
    check: (filePath, source) => {
      if (!featureOf(filePath)) return [];
      if (/\/(hooks|services)\//.test(filePath)) return [];
      return /from\s+["'][^"']*\/services\/[^"']*\.service["']/.test(source)
        ? ["imports a feature service outside hooks/; pages and components go through hooks"]
        : [];
    },
  },
  {
    id: "debug-statement",
    check: (_filePath, source) =>
      /(?<![\w.])console\s*\.\s*(log|debug|trace|info)\s*\(/.test(stripComments(source))
        ? ["contains a console debug statement"]
        : [],
  },
  {
    id: "commented-out-code",
    check: (_filePath, source) => {
      const lines = source.split("\n");
      const looksLikeCode =
        /^\s*\/\/\s*(const|let|var|function|import|export|return|if\s*\(|for\s*\(|while\s*\()\b/;
      const offenders = lines.reduce(
        (count, line) => (looksLikeCode.test(line) ? count + 1 : count),
        0,
      );
      return offenders >= 2
        ? [`contains ${offenders} lines of commented-out code; delete it (git preserves history)`]
        : [];
    },
  },
  {
    id: "file-naming",
    check: (filePath) => {
      const fileName = filePath.split("/").pop() ?? "";
      const base = fileName.replace(/\.(test|spec)\./, ".").replace(/\.[jt]sx?$/, "");
      // Components are PascalCase; everything else is kebab-case, optionally
      // with a dotted role suffix (products.service, roles.constants).
      const isPascal = /^[A-Z][A-Za-z0-9]*$/.test(base);
      const isKebabWithSuffix = /^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*$/.test(base);
      return isPascal || isKebabWithSuffix
        ? []
        : [`invalid file name "${fileName}"; use PascalCase for components, kebab-case otherwise`];
    },
  },
  {
    id: "file-too-large",
    check: (filePath, source) => {
      if (isTestFile(filePath)) return [];
      const lineCount = source.split("\n").length;
      return lineCount > MAX_FILE_LINES
        ? [`is ${lineCount} lines (max ${MAX_FILE_LINES}); split it into smaller units`]
        : [];
    },
  },
];

const stagedFiles = process.argv
  .slice(2)
  .flatMap((argument) => argument.split(/\s+/))
  .filter(Boolean)
  .map(toPosix)
  .filter(
    (filePath) =>
      /\.[jt]sx?$/.test(filePath) && (filePath.includes("src/") || filePath.includes("tests/")),
  );

if (stagedFiles.length === 0) {
  process.exit(0);
}

let failed = false;

for (const filePath of stagedFiles) {
  let source;
  try {
    source = readFileSync(filePath, "utf8");
  } catch {
    // Staged deletions have no content left to read.
    continue;
  }

  const findings = rules.flatMap((rule) =>
    rule.check(filePath, source).map((message) => `  [${rule.id}] ${message}`),
  );

  if (findings.length > 0) {
    failed = true;
    process.stderr.write(`\n${filePath}\n${findings.join("\n")}\n`);
  }
}

if (failed) {
  process.stderr.write(
    "\nArchitecture check failed. See .claude/architecture.md for the rules.\n\n",
  );
  process.exit(1);
}
