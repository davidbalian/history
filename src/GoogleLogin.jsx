import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import glogo from "./glogo.png";

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <button className="btn social-login" onClick={handleGoogleLogin}>
      <img src={glogo} alt="google logo" />
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
