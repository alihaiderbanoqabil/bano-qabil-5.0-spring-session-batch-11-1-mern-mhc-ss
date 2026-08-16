import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes";

const renderRoute = (route) => {
  if (route.index) {
    return <Route key={route.path ?? "index"} index element={route.element} />;
  }

  if (route.children) {
    return (
      <Route key={route.path || `route-${route.element?.type?.name || "group"}`} path={route.path} element={route.element}>
        {route.children.map(renderRoute)}
      </Route>
    );
  }

  return <Route key={route.path || `route-${route.element?.type?.name || "item"}`} path={route.path} element={route.element} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>{appRoutes.map(renderRoute)}</Routes>
    </BrowserRouter>
  );
};

export default App;
