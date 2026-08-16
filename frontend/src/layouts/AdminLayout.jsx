import React from "react";
import { Layout, Menu, Typography, Avatar, Space } from "antd";
import {
  DashboardOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;

const navItems = [
  { key: "/admin/dashboard", icon: <DashboardOutlined />, label: <Link to="/admin/dashboard">Dashboard</Link> },
  { key: "/admin/products", icon: <ShopOutlined />, label: <Link to="/admin/products">Products</Link> },
  { key: "/admin/orders", icon: <ShoppingCartOutlined />, label: <Link to="/admin/orders">Orders</Link> },
  { key: "/admin/users", icon: <UserOutlined />, label: <Link to="/admin/users">Users</Link> },
  { key: "/admin/settings", icon: <SettingOutlined />, label: <Link to="/admin/settings">Settings</Link> },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      <Sider width={240} style={{ background: "#001529" }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Title level={4} style={{ color: "#fff", margin: 0 }}>Admin Panel</Title>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={navItems}
          style={{ marginTop: 16 }}
        />
      </Sider>

      <Layout>
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
          <Text strong style={{ fontSize: 18 }}>Management Dashboard</Text>

          <Space align="center">
            <Avatar icon={<UserOutlined />} />
            <Text>Admin</Text>
            <span
              onClick={handleLogout}
              style={{ cursor: "pointer", color: "#ff4d4f", display: "flex", alignItems: "center", gap: 6 }}
            >
              <LogoutOutlined /> Logout
            </span>
          </Space>
        </Header>

        <Content style={{ margin: "24px", padding: "24px", background: "#fff", borderRadius: 12 }}>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: "center" }}>© 2026 Admin Dashboard</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
