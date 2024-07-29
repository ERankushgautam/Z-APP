import React from "react";

function Profile() {
  const auth = localStorage.getItem("user");
  console.log(auth);
  return (
    <div className="profile">
      
      <div className="details">

      <div className="dp">

      </div>

        <div className="data">
        <p>{JSON.parse(auth).name}</p>
        <p>{JSON.parse(auth).gender}</p>
        <p>{JSON.parse(auth).username}</p>
        {/* <p>{JSON.parse(auth)._id}</p> */}
        <p>
          contect here:
          <a href={`mailto: ${JSON.parse(auth).mail}`}>
            {JSON.parse(auth).email}
          </a>
        </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
