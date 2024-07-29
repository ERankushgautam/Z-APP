import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import PostLayout from "./PostLayout"; // Import the PostLayout component

function Home() {
  const [posts, setPosts] = useState([]); // State to store posts
  const navigate = useNavigate(); // Hook for navigation
  const auth = localStorage.getItem("user");
  const API_URL = process.env.REACT_APP_API_URL; // API URL from environment variables

  // Extract userID from local storage
  const userID = JSON.parse(auth)?.username;

  // Function to reload the page (for demonstration purposes)
  const reloadPage = () => {
    window.location.reload();
  };

  // Fetch posts from the server
  const handlePosts = async () => {
    try {
      const response = await fetch(`${API_URL}/post`);
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
    <div className="home">
      <Post />
      {posts.map((item) => (
        <PostLayout
          key={item._id} // Unique key for React
          post={item} // Pass the entire post object
          userID={userID} // Pass userID
          API_URL={API_URL} // Pass API URL for handling like/dislike actions
          navigate={navigate} // Pass navigate function for routing
        />
      ))}
      <div className="refresh">
        <button onClick={reloadPage}>R</button>
      </div>
    </div>
  );
}

export default Home;
