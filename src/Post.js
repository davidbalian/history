import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";

const db = firebase.firestore();

const Post = ({ username, year, location, text, postPic }) => {
  const [person, setPerson] = useState({ status: "", profile: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const collectionRef = db.collection("persons");

    collectionRef
      .where("username", "==", username)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Get the first document that matches the query and save it in state
          const doc = querySnapshot.docs[0];
          setPerson(doc.data());
          console.log(doc.data());
        } else {
          console.log("No documents found.");
        }
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  }, [username]);

  return (
    <div className="post">
      <div className="post-info">
        <img
          className="profile-picture"
          src={
            person.profile
              ? person.profile
              : "https://cdn.jsdelivr.net/gh/davidbalian/history-media/default-profile.jpeg"
          }
          alt="profile"
        />
        <div className="user-info">
          <div className="user-location">
            <Link to={`/${username}`} className="username serif bold">
              {username}
            </Link>
            <p>•</p>
            <p className="location serif">{location}, </p>
            <p className="year serif">{year} μ.Χ</p>
          </div>
          <p className="status serif">{person.status}</p>
        </div>
        <p
          className="info-icon"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          &#9432;
        </p>
        {show ? (
          <p
            className="info-icon reference"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            lorem ipsum dolor sit amet
          </p>
        ) : null}
      </div>
      <p className="post-text">{text}</p>
      {postPic ? <img className="post-img" src={postPic} alt="" /> : null}
    </div>
  );
};

export default Post;
