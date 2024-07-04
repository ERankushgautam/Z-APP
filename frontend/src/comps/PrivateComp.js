import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateComp() {
  const auth = localStorage.getItem("user");

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateComp;
