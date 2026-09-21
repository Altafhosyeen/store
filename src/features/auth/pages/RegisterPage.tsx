import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";
import { getLandingRoute } from "@/permissions";
import { useAuthStore } from "@/store";
import type { RegisterPayload } from "@/types";
import { useRegister } from "../hooks/use-register";

const { Title, Text } = Typography;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const register = useRegister();

  const handleFinish = (values: RegisterPayload) => {
    register.mutate(values, {
      onSuccess: () => {
        const landing = getLandingRoute(useAuthStore.getState().user);
        navigate(landing, { replace: true });
      },
    });
  };

  return (
    <>
      <div className="mb-5">
        <Title level={4} className="!mb-1">
          Create an account
        </Title>
        <Text type="secondary">Order faster and track your purchases.</Text>
      </div>

      {register.isError ? (
        <Alert type="error" showIcon className="mb-5" message={register.error.message} />
      ) : null}

      <Form<RegisterPayload>
        layout="vertical"
        onFinish={handleFinish}
        requiredMark={false}
        size="large"
        validateTrigger={["onBlur", "onChange"]}
      >
        <Form.Item
          name="name"
          label="Full name"
          rules={[{ required: true, message: "Enter your name" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Jane Doe" autoComplete="name" autoFocus />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email address"
          rules={[
            { required: true, message: "Enter your email address" },
            { type: "email", message: "That does not look like an email address" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="you@example.com" autoComplete="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, min: 8, message: "Use at least 8 characters" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Create a password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={register.isPending}>
          Create account
        </Button>
      </Form>

      <Flex align="center" justify="center" gap="small" className="mt-6">
        <Text type="secondary">Already have an account?</Text>
        <Link to={ROUTES.LOGIN}>Sign in</Link>
      </Flex>
    </>
  );
};
