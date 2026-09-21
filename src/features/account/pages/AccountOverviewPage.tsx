import { Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components";
import { ROUTES } from "@/constants";

const ITEMS = [
  { key: ROUTES.ACCOUNT_ORDERS, label: "Orders" },
  { key: ROUTES.ACCOUNT_ADDRESSES, label: "Addresses" },
  { key: ROUTES.ACCOUNT_PROFILE, label: "Profile" },
];

/** Account section shell: a simple tab menu over the nested order/address/profile pages. */
export const AccountOverviewPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
      <PageHeader title="My account" />
      <div className="grid gap-6 md:grid-cols-4">
        <Menu
          mode="vertical"
          selectedKeys={[pathname]}
          items={ITEMS}
          onClick={({ key }) => navigate(key)}
          className="md:col-span-1"
        />
        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
