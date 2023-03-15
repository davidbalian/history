import React from "react";

const Post = ({
  username,
  year,
  location,
  text,
  profilePic,
  postPic,
  status,
}) => {
  return (
    <div className="post">
      <div className="post-info">
        <img
          className="profile-picture"
          src={
            profilePic
              ? profilePic
              : "https://cdn.jsdelivr.net/gh/davidbalian/history-media/default-profile.jpeg"
          }
        />
        <div className="user-info">
          <div className="user-location">
            <p className="username serif bold">{username}</p>
            <p>•</p>
            <p className="location serif">{location}, </p>
            <p className="year serif">{year} μ.Χ</p>
          </div>
          {status ? <p className="status serif">{status}</p> : null}
        </div>
      </div>
      <p className="post-text">{text}</p>
      {postPic ? <img className="post-img" src={postPic} alt="" /> : null}
    </div>
  );
};

export default Post;
