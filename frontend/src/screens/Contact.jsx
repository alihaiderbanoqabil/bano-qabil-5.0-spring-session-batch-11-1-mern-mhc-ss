import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Contact = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Contact</Title>
      <Paragraph>Email: support@example.com</Paragraph>
      <Paragraph>Phone: +1 (555) 123-4567</Paragraph>
    </div>
  );
};

export default Contact;
