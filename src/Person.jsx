import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import Post from "./Post";
import Loading from "./Loading";

const db = firebase.firestore();

const Person = () => {
  const [posts, setPosts] = useState([]);
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    const collectionRef = db.collection("persons");
    const postsRef = db.collection("posts");

    collectionRef
      .where("username", "==", `${id}`)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Get the first document that matches the query and save it in state
          const doc = querySnapshot.docs[0];
          setPerson(doc.data());
        } else {
          console.log("No documents found.");
        }
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });

    postsRef
      .where("username", "==", `${id}`)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Get the first document that matches the query and save it in state
          const data = querySnapshot.docs.map((doc) => doc.data());
          setPosts(data);
          setIsLoading(false);
        } else {
          console.log("No documents found.");
        }
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  }, [id]);

  return (
    <div>
      {person && (
        <>
          <div className="profile-page">
            <div
              className="profile-background"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,0)), url(${
                  person.backgroundUrl
                    ? person.backgroundUrl
                    : "https://images.unsplash.com/photo-1643843207818-1bc6fc99b65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="picture-user-status">
              <img
                src={`${
                  person.profileUrl
                    ? person.profileUrl
                    : "https://cdn.jsdelivr.net/gh/davidbalian/history-media/default-profile.jpeg"
                }`}
                alt="profile"
                className="profile-page-picture"
              />
              <div>
                <p className="username-profile">{person.username}</p>
                <p className="username-status">{person.status}</p>
                <p className="bio">{person.bio}</p>
              </div>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <>
                <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
                  Posts by {id}
                </h2>
                <div className="posts">
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
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Person;
