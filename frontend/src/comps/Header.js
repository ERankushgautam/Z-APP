import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Logo from "./Logo";

function Header() {
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div className="header">
      <Logo />

      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/profile">PROFILE</Link>
        </li>
        <li>
          <Link to="/post">NEW POST</Link>
        </li>
        <li>
          <Link onClick={logout} to="/login">
            LOG OUT
          </Link>
        </li>
      </ul>
      <Footer />
    </div>
  );
}

export default Header;
