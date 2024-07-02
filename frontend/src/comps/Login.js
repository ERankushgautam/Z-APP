import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const login = async () => {
    const responce = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    let result = await responce.json();
    localStorage.setItem("user", JSON.stringify(result));
    navigate("/");
    console.log(result);
  };
  return (
    <div className="login">
      <div className="form">
        <input
          required
          type="email"
          value={email}
          id="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="email"
          value={password}
          id="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>
      <h1>
        <Link to="/signup">signup</Link>
      </h1>
    </div>
  );
}

export default Login;
