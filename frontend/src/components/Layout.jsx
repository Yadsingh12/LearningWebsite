import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        style={{
          marginLeft: collapsed ? "60px" : "200px",
          padding: "1rem",
          transition: "margin-left 0.3s ease",
          flex: 1,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
