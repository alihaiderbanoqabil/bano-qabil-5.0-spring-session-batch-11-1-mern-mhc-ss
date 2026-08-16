import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Cart = () => {
  return (
    <div>
      <Title level={3}>Your Cart</Title>
      <Paragraph>No items yet.</Paragraph>
    </div>
  );
};

export default Cart;
