import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>About Us</Title>
      <Paragraph>
        This storefront provides a clean and secure shopping experience with role-based access for both customers and admins.
      </Paragraph>
    </div>
  );
};

export default About;
