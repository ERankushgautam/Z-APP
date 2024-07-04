import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div className="header">
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/profile">PROFILE</Link>
        </li>
        <li>
          <Link onClick={logout} to="/login">
            LOG OUT
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
