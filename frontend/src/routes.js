import React from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import About from "./screens/About";
import Cart from "./screens/Cart";
import Contact from "./screens/Contact";
import EditProfile from "./screens/EditProfile";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Orders from "./screens/Orders";
import Product from "./screens/Product";
import Products from "./screens/Products";
import Signup from "./screens/Signup";

const createElement = (Component, props = {}, children) =>
  React.createElement(Component, props, children);

export const publicRoutes = [
  { path: "/", element: createElement(Home) },
  { path: "/login", element: createElement(Login) },
  { path: "/signup", element: createElement(Signup) },
  { path: "/about", element: createElement(About) },
  { path: "/contact", element: createElement(Contact) },
  { path: "/products", element: createElement(Products) },
  { path: "/product/:id", element: createElement(Product) },
];

export const adminRoutes = [
  {
    path: "/admin",
    element: createElement(
      ProtectedRoute,
      { allowedRoles: ["admin"] },
      createElement(AdminLayout)
    ),
    children: [
      { index: true, element: createElement(Navigate, { to: "/admin/dashboard", replace: true }) },
      { path: "dashboard", element: createElement(Home) },
      { path: "products", element: createElement(Products) },
      { path: "orders", element: createElement(Orders) },
      { path: "users", element: createElement("div", null, "Admin Users Panel") },
      { path: "settings", element: createElement("div", null, "Admin Settings") },
    ],
  },
];

export const customerRoutes = [
  {
    path: "/customer",
    element: createElement(
      ProtectedRoute,
      { allowedRoles: ["customer"] },
      createElement(CustomerLayout)
    ),
    children: [
      { index: true, element: createElement(Navigate, { to: "/customer/dashboard", replace: true }) },
      { path: "dashboard", element: createElement(Home) },
      { path: "products", element: createElement(Products) },
      { path: "cart", element: createElement(Cart) },
      { path: "orders", element: createElement(Orders) },
      { path: "profile", element: createElement(EditProfile) },
    ],
  },
];

export const appRoutes = [
  ...publicRoutes,
  ...adminRoutes,
  ...customerRoutes,
  { path: "*", element: createElement(NotFound) },
];
