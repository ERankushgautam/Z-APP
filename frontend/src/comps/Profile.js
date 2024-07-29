import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PostLayout from "./PostLayout";

function Profile() {
  const [posts, setPosts] = useState([]);
  const auth = localStorage.getItem("user");
  console.log(auth);
  const API_URL = process.env.REACT_APP_API_URL; // API URL from environment variables
  const navigate = useNavigate(); // Hook for navigation
  const userID = JSON.parse(auth)?.username;

  // Fetch posts from the server
  const handlePosts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/post/user/${JSON.parse(auth)._id}`
      );
      const result = await response.json();
      setPosts(result.reverse()); // Reverse posts to display the latest first
      console.log(result);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    handlePosts();
  }, []);
  return (
    <div className="profile">
      <div className="details">
        <h1>{JSON.parse(auth).name}</h1>
        <p>{JSON.parse(auth).gender}</p>
        <p>
          contect here:
          <a href={`mailto: ${JSON.parse(auth).mail}`}>
            {JSON.parse(auth).email}
          </a>
        </p>
      </div>
      <div className="profile-post-area">
        {posts.map((item) => (
          <PostLayout
            key={item._id} // Unique key for React
            post={item} // Pass the entire post object
            userID={userID} // Pass userID
            API_URL={API_URL} // Pass API URL for handling like/dislike actions
            navigate={navigate} // Pass navigate function for routing
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
