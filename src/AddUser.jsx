import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function AddUser() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const db = firebase.firestore();
    const query = db.collection("persons").where("username", "==", username);
    query.get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        setErrorMessage("Username already exists!");
      } else {
        db.collection("persons")
          .add({
            username: username,
            bio: bio,
            status: status,
            profileUrl: profileUrl,
            backgroundUrl: backgroundUrl,
          })
          .then(() => {
            setUsername("");
            setBio("");
            setStatus("");
            setProfileUrl("");
            setBackgroundUrl("");
            setErrorMessage("");
            console.log("User added to Firestore!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <label>
        Username:
        <input
          type="text"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Bio:
        <input
          type="text"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </label>
      <label>
        Status:
        <input
          type="text"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        />
      </label>
      <label>
        Profile URL:
        <input
          type="text"
          value={profileUrl}
          onChange={(event) => setProfileUrl(event.target.value)}
        />
      </label>
      <label>
        Background URL:
        <input
          type="text"
          value={backgroundUrl}
          onChange={(event) => setBackgroundUrl(event.target.value)}
        />
      </label>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddUser;
