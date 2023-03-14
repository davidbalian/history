import React from "react";

const Post = ({ username, year, location, text }) => {
  return (
    <div className="post">
      <div className="user-location">
        <p className="username">{username}</p>
        <p>•</p>
        <p className="location">{location}</p>
      </div>
      <p className="post-text">{text}</p>
      <p className="year">{year}</p>
    </div>
  );
};

export default Post;
