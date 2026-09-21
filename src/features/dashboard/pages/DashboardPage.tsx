import {
  DollarOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { PageHeader, StatCard } from "@/components";
import { CURRENCY } from "@/constants";
import { useGetDashboardSummary } from "../hooks/use-dashboard";

export const DashboardPage = () => {
  const { data, isLoading } = useGetDashboardSummary();

  return (
    <>
      <PageHeader title="Dashboard" description="Store performance at a glance." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Revenue"
          value={data ? `${CURRENCY.SYMBOL}${data.totalRevenue.toFixed(2)}` : 0}
          icon={<DollarOutlined />}
          tone="primary"
          isLoading={isLoading}
        />
        <StatCard
          title="Orders"
          value={data?.totalOrders ?? 0}
          icon={<ShoppingCartOutlined />}
          tone="sky"
          hint={data ? `${data.pendingOrders} pending` : undefined}
          isLoading={isLoading}
        />
        <StatCard
          title="Products"
          value={data?.totalProducts ?? 0}
          icon={<ShoppingOutlined />}
          tone="amber"
          isLoading={isLoading}
        />
        <StatCard
          title="Customers"
          value={data?.totalCustomers ?? 0}
          icon={<TeamOutlined />}
          tone="secondary"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
