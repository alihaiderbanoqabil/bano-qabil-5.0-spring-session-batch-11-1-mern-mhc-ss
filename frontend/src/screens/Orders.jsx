import React from "react";
import { Table, Typography } from "antd";

const { Title } = Typography;

const columns = [
  { title: "Order ID", dataIndex: "id", key: "id" },
  { title: "Customer", dataIndex: "customer", key: "customer" },
  { title: "Total", dataIndex: "total", key: "total" },
  { title: "Status", dataIndex: "status", key: "status" },
];

const data = [
  { key: "1", id: "#1001", customer: "John Doe", total: "$198.00", status: "Paid" },
  { key: "2", id: "#1002", customer: "Jane Smith", total: "$86.50", status: "Pending" },
];

const Orders = () => {
  return (
    <div>
      <Title level={3}>Orders</Title>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Orders;
