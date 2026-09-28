#!/usr/bin/env node
/**
 * Playwright driver for the Royal Nuts storefront/admin console.
 *
 * Usage:
 *   node driver.mjs shot <path> <out.png>     Navigate to a route, screenshot it
 *   node driver.mjs eval <path> <jsExpr>       Navigate, then evaluate JS in-page, print result
 *   node driver.mjs click <path> <selector> <out.png>   Navigate, click a selector, screenshot after
 *   node driver.mjs fill <path> <selector> <text> <out.png>  Navigate, fill an input, screenshot after
 *
 * Env:
 *   BASE_URL   Base URL of the running dev server (default http://localhost:5173)
 *
 * Requires the dev server already running (npm run dev) with
 * VITE_ENABLE_MOCK=true in .env.local, and Playwright's Chromium installed:
 *   npx playwright install chromium --with-deps
 */
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const [, , cmd, ...args] = process.argv;

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));

  try {
    if (cmd === "shot") {
      const [path, out] = args;
      await page.goto(BASE_URL + path, { waitUntil: "networkidle" });
      await page.screenshot({ path: out, fullPage: true });
      console.log(`Saved ${out}`);
    } else if (cmd === "eval") {
      const [path, expr] = args;
      await page.goto(BASE_URL + path, { waitUntil: "networkidle" });
      // eslint-disable-next-line no-eval
      const result = await page.evaluate(expr);
      console.log(JSON.stringify(result, null, 2));
    } else if (cmd === "click") {
      const [path, selector, out] = args;
      await page.goto(BASE_URL + path, { waitUntil: "networkidle" });
      await page.click(selector);
      await page.waitForTimeout(500);
      if (out) await page.screenshot({ path: out, fullPage: true });
      console.log(out ? `Clicked ${selector}, saved ${out}` : `Clicked ${selector}`);
    } else if (cmd === "fill") {
      const [path, selector, text, out] = args;
      await page.goto(BASE_URL + path, { waitUntil: "networkidle" });
      await page.fill(selector, text);
      if (out) await page.screenshot({ path: out, fullPage: true });
      console.log(out ? `Filled ${selector}, saved ${out}` : `Filled ${selector}`);
    } else {
      console.error("Unknown command. See header comment for usage.");
      process.exitCode = 1;
    }
  } finally {
    if (consoleErrors.length) {
      console.error("--- Browser console errors ---");
      for (const e of consoleErrors) console.error(e);
    }
    await browser.close();
  }
};

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
