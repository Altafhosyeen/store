import { App, Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants";
import { useForgotPassword } from "../hooks/use-forgot-password";

export const ForgotPasswordPage = () => {
  const { message } = App.useApp();
  const forgotPassword = useForgotPassword();

  const handleFinish = ({ email }: { email: string }) =>
    forgotPassword.mutate(email, {
      // Deliberately identical for success and failure so the response cannot
      // be used to probe which addresses are registered.
      onSuccess: () => message.success("If that email exists, a reset link is on its way."),
      onError: (error) => message.error(error.message),
    });

  return (
    <>
      <Typography.Title level={4}>Reset your password</Typography.Title>

      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Enter your email" },
            { type: "email", message: "Enter a valid email address" },
          ]}
        >
          <Input placeholder="you@example.com" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={forgotPassword.isPending}>
          Send reset link
        </Button>
      </Form>

      <div className="mt-4 text-sm">
        <Link to={ROUTES.LOGIN}>Back to sign in</Link>
      </div>
    </>
  );
};
