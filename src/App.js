import { useEffect, useState } from "react";
import initializeApp from "firebase/compat/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Post from "./Post";

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

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
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

  return (
    <div className="App">
      <div className="header">
        <h2 className="serif light">Histogram</h2>
      </div>
      <div className="posts">
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
}

export default App;
