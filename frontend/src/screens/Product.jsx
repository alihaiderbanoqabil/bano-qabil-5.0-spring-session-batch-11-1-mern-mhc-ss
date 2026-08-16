import React from "react";
import { Typography } from "antd";
import { useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Product = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Product Details</Title>
      <Paragraph>Viewing product ID: {id}</Paragraph>
    </div>
  );
};

export default Product;
