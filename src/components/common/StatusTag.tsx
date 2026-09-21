import { Tag } from "antd";
import type { StatusStyle } from "@/theme";

interface StatusTagProps {
  status: string;
  styles: Record<string, StatusStyle>;
}

/** Renders a status pill from one of the theme's status style maps. */
export const StatusTag = ({ status, styles }: StatusTagProps) => {
  const style = styles[status];
  if (!style) return <Tag>{status}</Tag>;

  return (
    <Tag
      style={{
        backgroundColor: style.bg,
        color: style.fg,
        borderColor: style.border,
      }}
    >
      {style.label}
    </Tag>
  );
};
