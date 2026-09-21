import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Form, Input, Typography } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";
import { getLandingRoute } from "@/permissions";
import { useAuthStore } from "@/store";
import type { LoginPayload } from "@/types";
import { useLogin } from "../hooks/use-login";

const { Title, Text } = Typography;

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useLogin();

  const handleFinish = (values: LoginPayload) => {
    login.mutate(values, {
      onSuccess: () => {
        const from = (location.state as { from?: string } | null)?.from;
        const landing = getLandingRoute(useAuthStore.getState().user);
        navigate(from ?? landing, { replace: true });
      },
    });
  };

  return (
    <>
      <div className="mb-5">
        <Title level={4} className="!mb-1">
          Sign in
        </Title>
        <Text type="secondary">Use the email address your account was created with.</Text>
      </div>

      {login.isError ? (
        <Alert type="error" showIcon className="mb-5" message={login.error.message} />
      ) : null}

      <Form<LoginPayload>
        layout="vertical"
        onFinish={handleFinish}
        requiredMark={false}
        size="large"
        validateTrigger={["onBlur", "onChange"]}
      >
        <Form.Item
          name="email"
          label="Email address"
          rules={[
            { required: true, message: "Enter your email address" },
            { type: "email", message: "That does not look like an email address" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            autoFocus
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          className="!mb-3"
          rules={[{ required: true, message: "Enter your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </Form.Item>

        <Flex justify="end" className="mb-5">
          <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password?</Link>
        </Flex>

        <Button type="primary" htmlType="submit" block loading={login.isPending}>
          {login.isPending ? "Signing in…" : "Sign in"}
        </Button>
      </Form>

      <Flex align="center" justify="center" gap="small" className="mt-6">
        <Text type="secondary">New here?</Text>
        <Link to={ROUTES.REGISTER}>Create an account</Link>
      </Flex>
    </>
  );
};
