import { EyeOutlined } from "@ant-design/icons";
import { Button, Select, Space, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { EmptyState, PageHeader, QueryStateBoundary, StatusTag } from "@/components";
import { buildRoute, ROUTES } from "@/constants";
import { useTableParams } from "@/hooks";
import { formatCurrency } from "@/lib/currency";
import { orderStatusStyles, paymentStatusStyles } from "@/theme";
import { ORDER_STATUS_OPTIONS } from "../constants/orders.constants";
import { useGetOrders } from "../hooks/use-orders";
import type { OrderDto, OrderStatus } from "../types/orders-api.types";

export const OrdersListPage = () => {
  const navigate = useNavigate();
  const { params, setParams } = useTableParams();

  const { data, isLoading, error, refetch } = useGetOrders(params);
  const orders = data?.items ?? [];

  const columns: ColumnsType<OrderDto> = [
    { title: "Order", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customerName", key: "customerName" },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: number) => formatCurrency(total),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <StatusTag status={status} styles={orderStatusStyles} />,
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => <StatusTag status={status} styles={paymentStatusStyles} />,
    },
    {
      title: "",
      key: "actions",
      width: 56,
      render: (_, order) => (
        <Tooltip title="View order">
          <Button
            type="text"
            icon={<EyeOutlined />}
            aria-label="View order"
            onClick={() => navigate(buildRoute(ROUTES.ADMIN_ORDER_DETAIL, { orderId: order.id }))}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Orders">
        <Space wrap>
          <Select
            allowClear
            placeholder="Status"
            className="w-40"
            options={ORDER_STATUS_OPTIONS}
            onChange={(status?: OrderStatus) => setParams({ ...params, page: 1, status })}
          />
        </Space>
      </PageHeader>

      <QueryStateBoundary
        isLoading={isLoading}
        error={error}
        isEmpty={orders.length === 0}
        emptyState={<EmptyState title="No orders yet" />}
        onRetry={refetch}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={orders}
          pagination={{
            current: params.page,
            total: data?.total ?? 0,
            onChange: (page, pageSize) => setParams({ ...params, page, pageSize }),
          }}
        />
      </QueryStateBoundary>
    </>
  );
};
