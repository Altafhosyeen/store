import { App, Card, Descriptions, Select } from "antd";
import { useParams } from "react-router-dom";
import { PageHeader, QueryStateBoundary, StatusTag } from "@/components";
import { CURRENCY } from "@/constants";
import { paymentStatusStyles } from "@/theme";
import { ORDER_STATUS_OPTIONS } from "../constants/orders.constants";
import { useGetOrder, useUpdateOrderStatus } from "../hooks/use-orders";
import type { OrderStatus } from "../types/orders-api.types";

export const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { message } = App.useApp();

  const { data: order, isLoading, error, refetch } = useGetOrder(orderId);
  const updateStatus = useUpdateOrderStatus();

  return (
    <>
      <PageHeader title={order ? `Order ${order.id}` : "Order"} />

      <QueryStateBoundary isLoading={isLoading} error={error} onRetry={refetch}>
        {order ? (
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <Descriptions column={1} bordered size="small" title="Items">
                {order.lines.map((line) => (
                  <Descriptions.Item
                    key={`${line.productId}-${line.variantLabel ?? ""}`}
                    label={line.name}
                  >
                    {line.quantity} × {CURRENCY.SYMBOL}
                    {line.unitPrice.toFixed(2)}
                    {line.variantLabel ? ` (${line.variantLabel})` : ""}
                  </Descriptions.Item>
                ))}
                <Descriptions.Item label="Total">
                  {CURRENCY.SYMBOL}
                  {order.total.toFixed(2)}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card>
              <Descriptions column={1} size="small" title="Status">
                <Descriptions.Item label="Order status">
                  <Select
                    className="w-full"
                    value={order.status}
                    options={ORDER_STATUS_OPTIONS}
                    loading={updateStatus.isPending}
                    onChange={(status: OrderStatus) =>
                      updateStatus.mutate(
                        { orderId: order.id, status },
                        {
                          onSuccess: () => message.success("Order status updated"),
                          onError: (mutationError) => message.error(mutationError.message),
                        },
                      )
                    }
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Payment">
                  <StatusTag status={order.paymentStatus} styles={paymentStatusStyles} />
                </Descriptions.Item>
              </Descriptions>

              <Descriptions column={1} size="small" title="Shipping address" className="mt-4">
                <Descriptions.Item label="Name">{order.shippingAddress.fullName}</Descriptions.Item>
                <Descriptions.Item label="Phone">{order.shippingAddress.phone}</Descriptions.Item>
                <Descriptions.Item label="Address">
                  {order.shippingAddress.line1}
                  {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""},{" "}
                  {order.shippingAddress.city} {order.shippingAddress.postalCode}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
        ) : null}
      </QueryStateBoundary>
    </>
  );
};
