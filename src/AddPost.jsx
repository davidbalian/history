import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const AddPost = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [year, setYear] = useState("");
  const [references, setReferences] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const db = firebase.firestore();
    const postRef = db.collection("posts");

    // Check if username exists in persons collection
    const personsRef = db.collection("persons");
    const personsSnapshot = await personsRef
      .where("username", "==", username)
      .get();
    if (personsSnapshot.empty) {
      // If username doesn't exist, add new user to persons collection
      await personsRef.add({ username });
    }

    // Add post to posts collection
    await postRef.add({
      username,
      location,
      text,
      image,
      year,
      references,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Clear form
    setUsername("");
    setLocation("");
    setText("");
    setImage("");
    setYear("");
    setReferences("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        required
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      />
      <br />
      <label htmlFor="text">Text:</label>
      <textarea
        id="text"
        required
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <br />
      <label htmlFor="image">Image:</label>
      <input
        type="text"
        id="image"
        value={image}
        onChange={(event) => setImage(event.target.value)}
      />
      <br />
      <label htmlFor="year">Year:</label>
      <input
        type="text"
        id="year"
        value={year}
        onChange={(event) => setYear(event.target.value)}
      />
      <br />
      <label htmlFor="references">References:</label>
      <input
        type="text"
        id="references"
        value={references}
        onChange={(event) => setReferences(event.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPost;
