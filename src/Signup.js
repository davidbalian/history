import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.svg";

const firebaseConfig = {
  apiKey: "AIzaSyC-be2hEU-eyyD1bgpEgVRJ5opojfnphqY",
  authDomain: "history-cb003.firebaseapp.com",
  projectId: "history-cb003",
  storageBucket: "history-cb003.appspot.com",
  messagingSenderId: "340751040194",
  appId: "1:340751040194:web:4998a86b618405fd9a855b",
  measurementId: "G-7XCZRMQBY1",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      navigate("/");
      await user.updateProfile({
        displayName: displayName,
      });

      // Save the user object to the Firestore database
      await db.collection("users").doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup">
      <img src={logo} alt="olympgram logo" className="logo" />
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">
          Sign Up
        </button>
        <Link to="/guest" className="btn">
          Guest Login
        </Link>
      </form>
      {error && <p>{error}</p>}
      <p className="small">
        Have an account? <Link to="/login">Login here.</Link>
      </p>
    </div>
  );
};

export default Signup;
