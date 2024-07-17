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
  const options = () => {
    console.log("options");
  };
  return (
    <div className="user-area">
      <div
        className="a"
        onClick={() => {
          userProfile(props.id);
        }}
      >
        <h1>{props.name}</h1>
        <p>@{props.username}</p>
      </div>
      <div onClick={options} className="b">
        II
      </div>
    </div>
  );
}

export default UserArea;
