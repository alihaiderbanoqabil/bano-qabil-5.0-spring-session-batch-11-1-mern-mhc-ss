import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const EditProfile = () => {
  return (
    <div>
      <Title level={3}>Profile</Title>
      <Paragraph>Update your personal information here.</Paragraph>
    </div>
  );
};

export default EditProfile;
