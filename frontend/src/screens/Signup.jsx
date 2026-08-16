import React, { useEffect } from "react";
import { Button, Card, message, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/features/apiSlice";

const { Title, Text } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  const [register, { isLoading, isError, isSuccess, error, data }] = useRegisterMutation()
  const [messageApi, contextHolder] = message.useMessage();


  // console.log({ isLoading, isError, isSuccess, error, data });

  useEffect(() => {

    if (isSuccess) {
      // messageApi.open({
      //   type: 'success',
      //   content: data.message || "Error while register",
      // });
      navigate("/login");
    } else if (isError) {
      messageApi.open({
        type: 'error',
        content: error?.data?.message,
      });
    }

  }, [isError, isSuccess])

  const handleSubmit = async (values) => {
    try {
      console.log("Signup payload:", values);
      const data = await register(values).unwrap();
      // console.log(data, "data");

    } catch (error) {
      console.log("Error while creating account", error);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "80px auto", padding: 24 }}>
      {contextHolder}
      <Card>
        <Title level={3} style={{ textAlign: "center" }}>Create Account</Title>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, min: 6 }]}>
            <Input.Password placeholder="Minimum 6 characters" />
          </Form.Item>

          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Phone number is required', min: 11 }]}>
            <Input placeholder="Enter your phone" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Text>
            Already a member? <Link to="/login">Login</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
