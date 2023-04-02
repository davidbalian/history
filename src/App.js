import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import { useState, useEffect } from "react";
import Welcome from "./Welcome";
import Header from "./Header";
import Person from "./Person";
import AddUser from "./AddUser";
import AddPost from "./AddPost";
import ScrollToTop from "./ScrollToTop";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigate("/login");
    } catch (err) {
      alert(err);
    }
  };

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
      {user ? (
        <button onClick={handleLogout} className="btn logout-btn">
          Logout
        </button>
      ) : null}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <Header />
                <Home />
              </>
            ) : (
              <div className="login-signup">
                <Welcome />
                <Login />
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
        <Route
          path="/guest"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/:id"
          element={
            <>
              <Header />
              <Person />
            </>
          }
        />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
      <ScrollToTop />
    </div>
  );
}

export default App;
