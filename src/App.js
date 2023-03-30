import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import { useState, useEffect } from "react";
import Welcome from "./Welcome";

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

function App() {
  const [user, setUser] = useState(null);
  const auth = firebase.auth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    // cleanup function
    return unsubscribe;
  }, [auth]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <header className="header">
                  <h2 className="serif light">Olympgram</h2>
                </header>
                <Home />
              </>
            ) : (
              <div className="login-signup">
                <Welcome />
                <Signup />
              </div>
            )
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <div className="login-signup">
                <Welcome />
                <Login />
              </div>
            )
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <div className="login-signup">
                <Welcome />
                <Signup />
              </div>
            )
          }
        />
        <Route path="/guest" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
