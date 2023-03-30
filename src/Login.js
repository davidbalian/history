import React, { useState } from "react";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="login">
      <img src={logo} alt="olympgram logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">
          Login
        </button>
        <Link to="/guest" className="btn">
          Guest Login
        </Link>
      </form>
      {error && <p>{error}</p>}
      <p className="small">
        No account? <Link to="/signup">Register here.</Link>
      </p>
    </div>
  );
};

export default Login;
