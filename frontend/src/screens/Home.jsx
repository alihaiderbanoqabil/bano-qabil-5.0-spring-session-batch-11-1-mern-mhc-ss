import React from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Welcome to the Store</Title>
      <Paragraph>
        Browse the latest products, manage your orders, and access your dashboard based on your role.
      </Paragraph>

      <Link to="/products">
        <Button type="primary">Browse Products</Button>
      </Link>
    </div>
  );
};

export default Home;
