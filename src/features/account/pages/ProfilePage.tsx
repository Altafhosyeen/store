import { App, Button, Form, Input } from "antd";
import { useAuthStore } from "@/store";
import { useUpdateProfile } from "../hooks/use-account";

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const { message } = App.useApp();
  const updateProfile = useUpdateProfile();

  return (
    <Form
      layout="vertical"
      initialValues={{ name: user?.name }}
      onFinish={(values: { name: string }) =>
        updateProfile.mutate(values, {
          onSuccess: () => message.success("Profile updated"),
          onError: (error) => message.error(error.message),
        })
      }
    >
      <Form.Item name="name" label="Full name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email">
        <Input value={user?.email} disabled />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={updateProfile.isPending}>
        Save changes
      </Button>
    </Form>
  );
};
