import React, { useEffect } from "react";
import { Button, Card, message, Form, Input, Typography, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/features/apiSlice";
import { getStoredSession } from "../components/ProtectedRoute";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isError, isSuccess, error, data }] = useLoginMutation()
  const [messageApi, contextHolder] = message.useMessage();
  const { isAuthenticated, user } = getStoredSession();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(user?.role === "admin" ? "/admin" : "/customer");
    }
  }, [isAuthenticated, user])

  const handleSubmit = async (values) => {

    try {
      const data = await login(values).unwrap()
      console.log(data, "data", data?.user?.role);

      // localStorage.setItem("token", "demo-token");
      localStorage.setItem("user", JSON.stringify(data?.user));
      // messageApi.open({
      //   type: 'success',
      //   content: data.message,
      // });
      navigate(data?.user?.role === "admin" ? "/admin" : "/customer");
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error?.data?.message,
      });
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "80px auto", padding: 24 }}>
      {contextHolder}
      <Card>
        <Title level={3} style={{ textAlign: "center" }}>Login</Title>

        {/* <Alert
          type="info"
          showIcon
          message="Demo access"
          description="Use the role field to switch between admin and customer access."
          style={{ marginBottom: 20 }}
        /> */}

        <Form layout="vertical" onFinish={handleSubmit}>
          {/* <Form.Item label="Name" name="name">
            <Input placeholder="Enter your name" />
          </Form.Item> */}

          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="you@example.com" />
          </Form.Item>

          {/* <Form.Item label="Role" name="role" initialValue="customer">
            <Input placeholder="customer or admin" />
          </Form.Item> */}

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Text>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
