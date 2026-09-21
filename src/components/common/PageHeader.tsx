import { Flex, Typography } from "antd";
import type { ReactNode } from "react";

const { Title, Text } = Typography;

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  /** Filters, tabs or a segmented control shown under the title block. */
  children?: ReactNode;
}

export const PageHeader = ({ title, description, actions, children }: PageHeaderProps) => (
  <div className="mb-6">
    <Flex wrap align="center" justify="space-between" gap="middle">
      <Title level={2} className="!mb-0 min-w-0">
        {title}
      </Title>
      {actions ? (
        <Flex wrap align="center" gap="small">
          {actions}
        </Flex>
      ) : null}
    </Flex>
    {description ? (
      <Text type="secondary" className="mt-1 block">
        {description}
      </Text>
    ) : null}
    {children ? <div className="mt-5">{children}</div> : null}
  </div>
);
