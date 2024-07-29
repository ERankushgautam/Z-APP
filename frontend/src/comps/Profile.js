import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PostLayout from "./PostLayout";

function Profile() {
  const [posts, setPosts] = useState([]);
  const auth = localStorage.getItem("user");
  console.log(auth);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const userID = JSON.parse(auth)?.username;

  const handlePosts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/post/user/${JSON.parse(auth)._id}`
      );
      const result = await response.json();
      setPosts(result.reverse());
      console.log(result);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    handlePosts();
  }, []);
  return (
    <div className="profile">
      <div className="details">
        <div className="dp"></div>

        <div className="data">
          <p>{JSON.parse(auth).name}</p>
          <p>{JSON.parse(auth).gender}</p>
          <p>{JSON.parse(auth).username}</p>
          <p>
            contect here:
            <a href={`mailto: ${JSON.parse(auth).mail}`}>
              {JSON.parse(auth).email}
            </a>
          </p>
        </div>
      </div>
      <div className="profile-post-area">
        {posts.map((item) => (
          <PostLayout
            key={item._id}
            post={item}
            userID={userID}
            API_URL={API_URL}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
