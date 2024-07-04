import React, { useEffect, useState } from "react";
import Logo from "./Logo";

function Home() {
  const [posts, setPosts] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const handlePosts = async () => {
    const responce = await fetch(`${API_URL}/post`);
    const result = await responce.json();
    setPosts(result);
    console.log(result);
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
            <button>LIKE</button>
            <button>COMMENT</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
