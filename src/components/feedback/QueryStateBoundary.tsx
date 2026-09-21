import { Alert, Button, Empty, Skeleton } from "antd";
import type { ReactNode } from "react";
import { ApiError } from "@/services/api";

interface QueryStateBoundaryProps {
  isLoading: boolean;
  error?: unknown;
  isEmpty?: boolean;
  emptyText?: string;
  /** Replaces the default Empty when the page has a real call to action. */
  emptyState?: ReactNode;
  onRetry?: () => void;
  children: ReactNode;
}

/**
 * The loading/error/empty/success ladder every async page owes the user.
 * Permission-denied is handled a step earlier by the route guard.
 */
export const QueryStateBoundary = ({
  isLoading,
  error,
  isEmpty = false,
  emptyText = "No records found",
  emptyState,
  onRetry,
  children,
}: QueryStateBoundaryProps) => {
  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }

  if (error) {
    const apiError = error instanceof ApiError ? error : null;
    const isRetryable =
      apiError === null ||
      apiError.kind === "network" ||
      apiError.kind === "timeout" ||
      apiError.kind === "server";

    return (
      <Alert
        type="error"
        showIcon
        message="Could not load this page"
        description={apiError?.message ?? "An unexpected error occurred."}
        action={
          onRetry && isRetryable ? (
            <Button size="small" onClick={onRetry}>
              Retry
            </Button>
          ) : undefined
        }
      />
    );
  }

  if (isEmpty) {
    return <>{emptyState ?? <Empty description={emptyText} />}</>;
  }

  return <>{children}</>;
};
