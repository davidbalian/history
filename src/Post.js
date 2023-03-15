import React from "react";

const Post = ({ username, year, location, text }) => {
  return (
    <div className="post">
      <div className="user-location">
        <p className="username serif bold">{username}</p>
        <p>•</p>
        <p className="location serif">{location}, </p>
        <p className="year serif">{year} μ.Χ</p>
      </div>
      <p className="post-text">{text}</p>
    </div>
  );
};

export default Post;
