import React, { useState } from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

function Post() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  let auth = localStorage.getItem("user");
  auth = JSON.parse(auth);
  const userID = auth._id;
  const username = auth.username;
  const name = auth.name;

  const handlePost = async () => {
    const post = { name, username, userID, content };
    if (auth) {
      try {
        const responce = await fetch(`${API_URL}/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        });
        const result = await responce.json();
        console.log(result);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="post">
      <Logo />
      <div className="form">
        <p>Create New Post</p>
        <textarea
          value={content}
          name="caption"
          id="caption"
          placeholder="write your thoughts here..."
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={handlePost}>Post</button>
      </div>
    </div>
  );
}

export default Post;
