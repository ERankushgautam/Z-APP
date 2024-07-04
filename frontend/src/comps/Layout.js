import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Logo from "./Logo";

function Layout() {
  return (
    <>
      <div className="layout">
        <Header />
        <div className="feed-container">
          <Logo />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
