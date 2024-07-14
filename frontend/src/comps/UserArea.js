import React from "react";
import { useNavigate } from "react-router-dom";

function UserArea(props) {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const userProfile = async (id) => {
    if (JSON.parse(auth)._id === id) {
      navigate(`/profile`);
    } else {
      navigate(`/user-profile/${id}`);
    }
  };
  return (
    <div
      className="user-area"
      onClick={() => {
        userProfile(props.id);
      }}
    >
      <h1>{props.name}</h1>
      <p>@{props.username}</p>
    </div>
  );
}

export default UserArea;
