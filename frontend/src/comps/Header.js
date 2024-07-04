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
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/profile">profile</Link>
        </li>
        <li>
          <Link onClick={logout} to="/login">
            logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
