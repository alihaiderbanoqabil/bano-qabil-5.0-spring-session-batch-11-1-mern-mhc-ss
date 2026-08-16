import React from "react";
import { Layout, Menu, Typography, Space, Button } from "antd";
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, AppstoreOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const navItems = [
  { key: "/customer/dashboard", label: <Link to="/customer/dashboard">Home</Link>, icon: <HomeOutlined /> },
  { key: "/customer/products", label: <Link to="/customer/products">Products</Link>, icon: <AppstoreOutlined /> },
  { key: "/customer/cart", label: <Link to="/customer/cart">Cart</Link>, icon: <ShoppingCartOutlined /> },
  { key: "/customer/orders", label: <Link to="/customer/orders">Orders</Link>, icon: <UserOutlined /> },
  { key: "/customer/profile", label: <Link to="/customer/profile">Profile</Link>, icon: <UserOutlined /> },
];

const CustomerLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
          padding: "0 24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <div>
          <Title level={4} style={{ margin: 0 }}>ShopCart</Title>
        </div>

        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={navItems}
          style={{ flex: 1, justifyContent: "center", borderBottom: "none" }}
        />

        <Space>
          <Button type="default" onClick={() => navigate("/customer/profile")}>Profile</Button>
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>
        </Space>
      </Header>

      <Content style={{ margin: "24px auto", width: "100%", maxWidth: 1200, padding: "0 16px" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, minHeight: 500 }}>
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        <Text type="secondary">Customer Portal © 2026</Text>
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;
