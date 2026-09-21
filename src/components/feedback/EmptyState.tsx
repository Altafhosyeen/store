import { Empty, Typography } from "antd";
import type { ReactNode } from "react";
import { BodyLarge } from "@/components/common/Text";

const { Text } = Typography;

interface EmptyStateProps {
  title: string;
  /** One sentence on why it is empty and what to do — not an apology. */
  description?: string;
  /** A single primary action. Two competing buttons make the state harder. */
  action?: ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    className="py-12"
    description={
      <div className="mx-auto max-w-sm">
        <BodyLarge block strong>
          {title}
        </BodyLarge>
        {description ? (
          <Text type="secondary" className="mt-1 block">
            {description}
          </Text>
        ) : null}
      </div>
    }
  >
    {action}
  </Empty>
);
