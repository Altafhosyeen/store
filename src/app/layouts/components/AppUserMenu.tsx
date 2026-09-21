import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { BodySmall, Caption } from "@/components/common/Text";
import { ROUTES, USER_ROLE_NAMES } from "@/constants";
import { useAuth } from "@/hooks/use-auth";

export const AppUserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: [
          { key: "profile", icon: <SettingOutlined />, label: "Profile" },
          { type: "divider" },
          { key: "signout", icon: <LogoutOutlined />, label: "Sign out", danger: true },
        ],
        onClick: ({ key }) => {
          if (key === "signout") {
            void handleSignOut();
            return;
          }
          navigate(ROUTES.ACCOUNT_PROFILE);
        },
      }}
    >
      <button type="button" className="flex items-center gap-2 border-0 bg-transparent px-2 py-1">
        <Avatar size="small" src={user.avatarUrl} icon={<UserOutlined />} />
        <span className="hidden text-left leading-tight sm:block">
          <BodySmall block>{user.name}</BodySmall>
          <Caption block type="secondary">
            {USER_ROLE_NAMES[user.roleId]}
          </Caption>
        </span>
      </button>
    </Dropdown>
  );
};
