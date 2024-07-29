import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostLayout from "./PostLayout";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [posts, setPosts] = useState([]); // State to store posts

  const { id } = useParams();
  const auth = localStorage.getItem("user");
  const navigate = useNavigate(); // Hook for navigation

  const [profileData, setProfileData] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  const userID = JSON.parse(auth)?.username;

  //   console.log(id);

  const userProfile = async () => {
    // console.log(id);
    const responce = await fetch(`${API_URL}/profile/${id}`);
    const result = await responce.json();
    console.log(result);
    setProfileData(result);
  };
  // Fetch posts from the server
  const handlePosts = async () => {
    try {
      const response = await fetch(`${API_URL}/post/user/${id}`);
      const result = await response.json();
      setPosts(result.reverse()); // Reverse posts to display the latest first
      console.log(result);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    userProfile();
    handlePosts();
  }, [id]);
  return (
    <div className="user-profile">
      {profileData ? (
        <>
          <div>
            <h1>{profileData.name}</h1>
            <p>@{profileData.username}</p>
            <p>{profileData.email}</p>
            <p>{profileData.gender}</p>
          </div>
          <div className="user-posts">
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
        </>
      ) : (
        <p>Select a user to see profile details</p>
      )}
    </div>
  );
}

export default UserProfile;
