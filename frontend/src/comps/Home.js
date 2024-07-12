import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;
  const auth = localStorage.getItem("user");
  const userID = JSON.parse(auth).username;

  const handlePosts = async () => {
    try {
      const response = await fetch(`${API_URL}/post`);
      const result = await response.json();
      setPosts(result.slice(-50).reverse());
      console.log(result);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLike = async (_id) => {
    console.log(_id);
    const response = await fetch(`${API_URL}/post-like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, userID }),
    });
    const result = await response.json();
    console.log("clicked", result);

    // Update the like count for the specific post
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === _id ? { ...post, like: [...post.like, userID] } : post
      )
    );
  };

  const userProfile = async (id) => {
    if (JSON.parse(auth)._id == id) {
      navigate(`/profile`);
    } else {
      navigate(`/user-profile/${id}`);
    }
  };

  useEffect(() => {
    handlePosts();
  }, []);

  return (
    <div className="home">
      {posts.map((item) => (
        <div key={item._id} className="post">
          <div className="user-area" onClick={() => userProfile(item.userID)}>
            <h1>{item.name}</h1>
            <p>@{item.username}</p>
          </div>
          <div className="content">
            <p>{item.content}</p>
          </div>
          <div className="action">
            <button onClick={() => handleLike(item._id)}>
              {item.like.length} LIKES
            </button>
            <button>COMMENT</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
