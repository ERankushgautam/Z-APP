import React, { useEffect, useState } from "react";

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
        <div key={item._id}>
          <h1>{item.userName}</h1>
          <h3>{item.userID}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
