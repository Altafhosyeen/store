import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EmptyState, PageHeader, QueryStateBoundary } from "@/components";
import { useTableParams } from "@/hooks";
import { formatCurrency } from "@/lib/currency";
import { useGetCustomers } from "../hooks/use-customers";
import type { CustomerDto } from "../types/customers-api.types";

export const CustomersListPage = () => {
  const { params, setParams } = useTableParams();
  const { data, isLoading, error, refetch } = useGetCustomers(params);
  const customers = data?.items ?? [];

  const columns: ColumnsType<CustomerDto> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Orders", dataIndex: "orderCount", key: "orderCount" },
    {
      title: "Total spent",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (value: number) => formatCurrency(value),
    },
  ];

  return (
    <>
      <PageHeader title="Customers" />

      <QueryStateBoundary
        isLoading={isLoading}
        error={error}
        isEmpty={customers.length === 0}
        emptyState={<EmptyState title="No customers yet" />}
        onRetry={refetch}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={customers}
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
