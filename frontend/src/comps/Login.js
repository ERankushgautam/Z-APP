import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const login = async () => {
    if (!email || !password) {
      setError("**Detail Missing!!**");
      console.log("**Detail Missing!!**");
      return;
    } else {
      const responce = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      let result = await responce.json();
      console.log(result);

      if (result.user) {
        console.log("Login successful");
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/");
        console.log(result);
      } else {
        console.log("**Wrong Password or Email**");
        setError("**Wrong Password or Email**");
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <div className="login">
      <Logo />
      <div className="form">
        <p>Log in to Z APP</p>
        <span>{error}</span>
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
        <button onClick={login}>Log In</button>
        <p>
          <Link to="/signup">Create New account !</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
