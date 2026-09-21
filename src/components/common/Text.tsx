import { ConfigProvider, Typography } from "antd";
import type { ReactNode } from "react";
import { typography } from "@/theme";

const { Text } = Typography;

interface TextProps {
  children: ReactNode;
  /** antd's semantic colour: undefined is body text, "secondary" is muted. */
  type?: "secondary" | "success" | "warning" | "danger";
  strong?: boolean;
  /** Renders as a block so it can carry its own margin in a stack. */
  block?: boolean;
  className?: string;
}

/**
 * Size-named wrappers around `Typography.Text`. The scale comes from a scoped
 * `fontSize` token, so resizing the whole product is one edit in
 * src/theme/typography.ts rather than a sweep through pages. Colour still
 * comes from antd's `type`, never a Tailwind colour class.
 */
const sized =
  (fontSize: number) =>
  ({ children, type, strong, block, className }: TextProps) => (
    <ConfigProvider theme={{ token: { fontSize } }}>
      <Text type={type} strong={strong} className={block ? `block ${className ?? ""}` : className}>
        {children}
      </Text>
    </ConfigProvider>
  );

export const BodyLarge = sized(typography.bodyLarge.fontSize);
export const BodySmall = sized(typography.bodySmall.fontSize);
export const Caption = sized(typography.caption.fontSize);
