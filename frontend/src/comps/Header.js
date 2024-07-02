import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div>
      <ul>
        <li>
          <Link to="/signup">signup</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link onClick={logout} to="/signup">
            logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
