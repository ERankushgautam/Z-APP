import React, { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;
  const auth = localStorage.getItem("user");
  const userID = JSON.parse(auth)._id;

  const handlePosts = async () => {
    const responce = await fetch(`${API_URL}/post`);
    const result = await responce.json();
    setPosts(result.reverse());
    console.log(result);
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
    console.log("clicked");

    // Update the like count for the specific post
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === _id ? { ...post, like: [...post.like, userID] } : post
      )
    );
  };

  useEffect(() => {
    handlePosts();
  }, []);

  return (
    <div className="home">
      {posts.map((item) => (
        <div key={item._id} className="post">
          <div className="user-area">
            <h1>{item.userName}</h1>
            <p>{item.userID}</p>
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
