import React from "react";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import Post from "./Post";
import Loading from "./Loading.jsx";

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
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  }, []);

  return (
    <div className="home">
      <div className="posts">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {posts.map((post) => (
              <Post
                key={post.text}
                username={post.username}
                location={post.location}
                text={post.text}
                year={post.year}
                postPic={post.image ? post.image : ""}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
