import { Avatar, Card, ConfigProvider, Flex, Skeleton, Statistic } from "antd";
import type { ReactNode } from "react";
import { Caption } from "@/components/common/Text";
import { colors, radius } from "@/theme";

export type StatTone = "primary" | "secondary" | "amber" | "sky";

/** Accent tones for the icon chip. One accent per card, never a grid of four. */
const tones: Record<StatTone, { bg: string; fg: string }> = {
  primary: { bg: colors.primaryBg, fg: colors.primary },
  secondary: { bg: colors.secondaryBg, fg: colors.secondary },
  amber: { bg: colors.warningBg, fg: colors.warningText },
  sky: { bg: colors.infoBg, fg: colors.infoText },
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  tone?: StatTone;
  /** Short qualifier under the number, e.g. "+12 this week". */
  hint?: string;
  isLoading?: boolean;
}

export const StatCard = ({
  title,
  value,
  icon,
  tone = "primary",
  hint,
  isLoading = false,
}: StatCardProps) => {
  const accent = tones[tone];

  return (
    <Card size="small">
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 1 }} title={{ width: "60%" }} />
      ) : (
        <Flex align="flex-start" justify="space-between" gap="middle">
          <Statistic title={title} value={value} />
          {icon ? (
            <ConfigProvider
              theme={{
                components: {
                  Avatar: {
                    colorTextPlaceholder: accent.bg,
                    colorTextLightSolid: accent.fg,
                    borderRadius: radius.md,
                  },
                },
              }}
            >
              <Avatar shape="square" size={40} icon={icon} />
            </ConfigProvider>
          ) : null}
        </Flex>
      )}
      {hint && !isLoading ? (
        <Caption block type="secondary" className="mt-2">
          {hint}
        </Caption>
      ) : null}
    </Card>
  );
};
