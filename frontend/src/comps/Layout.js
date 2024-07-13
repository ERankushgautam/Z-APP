import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="layout">
        <Header />
        <div className="feed-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
