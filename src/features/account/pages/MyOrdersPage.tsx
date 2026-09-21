import { Link } from "react-router-dom";
import { EmptyState, QueryStateBoundary, StatusTag } from "@/components";
import { buildRoute, CURRENCY, ROUTES } from "@/constants";
import { orderStatusStyles } from "@/theme";
import { useGetMyOrders } from "../hooks/use-account";

export const MyOrdersPage = () => {
  const { data, isLoading, error, refetch } = useGetMyOrders();
  const orders = data?.items ?? [];

  return (
    <QueryStateBoundary
      isLoading={isLoading}
      error={error}
      isEmpty={orders.length === 0}
      emptyState={
        <EmptyState title="No orders yet" description="Your past orders will show up here." />
      }
      onRetry={refetch}
    >
      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={buildRoute(ROUTES.ACCOUNT_ORDER_DETAIL, { orderId: order.id })}
            className="flex items-center justify-between rounded border border-hairline-light p-4"
          >
            <div>
              <div className="font-medium">Order #{order.id}</div>
              <div className="text-neutral-500 text-sm">
                {CURRENCY.SYMBOL}
                {order.total.toFixed(2)}
              </div>
            </div>
            <StatusTag status={order.status} styles={orderStatusStyles} />
          </Link>
        ))}
      </div>
    </QueryStateBoundary>
  );
};
