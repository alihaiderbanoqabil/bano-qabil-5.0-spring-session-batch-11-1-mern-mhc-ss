import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Products = () => {
  return (
    <div>
      <Title level={3}>Products</Title>
      <Paragraph>Product list goes here.</Paragraph>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {[1, 2, 3].map((item) => (
          <Card key={item} title={`Product ${item}`}>
            This is a sample product card for the catalog.
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
