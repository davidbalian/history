import React from "react";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import Post from "./Post";
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

const db = firebase.firestore();

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const collectionRef = db.collection("posts");
    const query = collectionRef.orderBy("year");

    query
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setPosts(data);
        });
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigate("/login");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="home">
      <div className="posts">
        <button onClick={handleLogout} className="btn logout-btn">
          Logout
        </button>

        {posts.map((post) => (
          <Post
            key={post.username}
            username={post.username}
            location={post.location}
            text={post.text}
            year={post.year}
            profilePic={post.profile ? post.profile : ""}
            postPic={post.image ? post.image : ""}
            status={post.status ? post.status : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
