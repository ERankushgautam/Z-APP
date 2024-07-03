import React from "react";

function Profile() {
  const auth = localStorage.getItem("user");
  return (
    <div className="profile">
      <div className="details">
        <h1>{JSON.parse(auth).name}</h1>
        <p>{JSON.parse(auth)._id}</p>
        <p>
          contect here:
          <a href={`mailto: ${JSON.parse(auth).mail}`}>
            {JSON.parse(auth).email}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Profile;
