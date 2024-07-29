import React, { useState } from "react";
import UserArea from "./UserArea";

function PostLayout({ post, userID, API_URL, navigate }) {
  const [liked, setLiked] = useState(post.like.includes(userID)); // Check if user has already liked the post

  // Handle like action
  const handleLike = async () => {
    try {
      const response = await fetch(`${API_URL}/post-like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: post._id, userID }),
      });
      const result = await response.json();
      setLiked(true);
      console.log("Liked", result);

      // Update like state
      post.like.push(userID);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Handle dislike action
  const handleDislike = async () => {
    try {
      const response = await fetch(`${API_URL}/post-dislike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: post._id, userID }),
      });
      const result = await response.json();
      setLiked(false);
      console.log("Disliked", result);

      // Update like state
      const index = post.like.indexOf(userID);
      if (index !== -1) {
        post.like.splice(index, 1);
      }
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  // Determine like or dislike action
  const handleLikeORDislike = () => {
    if (!liked) {
      handleLike();
    } else {
      handleDislike();
    }
  };

  // Navigate to comments page
  const handleComments = () => {
    navigate(`/comments/${post._id}`);
  };

  return (
    <div className="post">
      <UserArea name={post.name} username={post.username} id={post.userID} />

      <div className="content" onClick={handleComments}>
        <p>{post.content}</p>
      </div>

      <div className="action">
        <button onClick={handleLikeORDislike}>
          {post.like.length} {liked ? "LIKED" : "LIKE"}
        </button>
        <button onClick={handleComments}>COMMENT</button>
      </div>
    </div>
  );
}

export default PostLayout;
