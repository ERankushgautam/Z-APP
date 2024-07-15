import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import UserArea from "./UserArea";

function Home() {
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const API_URL = process.env.REACT_APP_API_URL;

  const userID = JSON.parse(auth).username;

  const reloadPage = () => {
    window.location.reload();
  };

  const handlePosts = async () => {
    try {
      const response = await fetch(`${API_URL}/post`);
      const result = await response.json();
      setPosts(result.reverse());
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
    setLiked(true);
    console.log("clicked", result);

    // Update the like count for the specific post
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === _id ? { ...post, like: [...post.like, userID] } : post
      )
    );
  };

  const handleDislike = async (_id) => {
    const responce = await fetch(`${API_URL}/post-dislike`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, userID }),
    });
    const result = await responce.json();
    setLiked(false);
    console.log("clicked", result);

    // Update the like count for the specific post
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === _id
          ? { ...post, like: post.like.filter((id) => id !== userID) }
          : post
      )
    );
  };

  const handleLikeORDislike = (_id) => {
    if (!liked) {
      handleLike(_id);
    } else {
      handleDislike(_id);
    }
  };

  const handleComments = (id) => {
    navigate(`/comments/${id}`);
  };

  useEffect(() => {
    handlePosts();
  }, []);

  return (
    <div className="home">
      <Post />
      {posts.map((item) => (
        <div key={item._id} className="post">
          <UserArea
            name={item.name}
            username={item.username}
            id={item.userID}
          />

          <div className="content" onClick={() => handleComments(item._id)}>
            <p>{item.content}</p>
          </div>
          <div className="action">
            <button onClick={() => handleLikeORDislike(item._id)}>
              {item.like.length} LIKES
            </button>
            <button onClick={() => handleComments(item._id)}>COMMENT</button>
          </div>
        </div>
      ))}
      <div className="refresh">
        <button onClick={reloadPage}>R</button>
      </div>
    </div>
  );
}

export default Home;
