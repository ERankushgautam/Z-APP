import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Comments() {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState({});
  const [comment, setComment] = useState("");
  const auth = localStorage.getItem("user");
  const username = JSON.parse(auth).username;
  const API_URL = process.env.REACT_APP_API_URL;

  const postDetails = async () => {
    try {
      const responce = await fetch(`${API_URL}/comment/${id}`);
      const result = await responce.json();
      setSinglePost(result);
      console.log(result);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const addComment = async () => {
    try {
      if (comment) {
        const responce = await fetch(`${API_URL}/comment/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, content: comment }),
        });
        const result = await responce.json();
        console.log(result);
        setComment("");
        postDetails();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    postDetails();
  }, [id]);
  return (
    <div className="postdetails">
      <div className="post">
        <div className="user-area">
          <h1>{singlePost.name}</h1>
          <p>@{singlePost.username}</p>
        </div>
        <div className="content">
          <p>{singlePost.content}</p>
          <p>{singlePost.like ? singlePost.like.length : 0} likes</p>
        </div>
        <div className="action">
          <input
            type="text"
            value={comment}
            placeholder="comment somthing..."
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button onClick={addComment}>Comment</button>
        </div>
      </div>
      {singlePost.comments &&
        singlePost.comments
          .slice()
          .reverse()
          .map((comment) => (
            <div className="comment" key={comment._id}>
              <p>
                <strong>{comment.username}</strong>
              </p>
              <p>{comment.content}</p>
            </div>
          ))}
    </div>
  );
}

export default Comments;
