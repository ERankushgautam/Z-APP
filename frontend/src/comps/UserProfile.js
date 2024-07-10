import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  //   console.log(id);

  const userProfile = async () => {
    // console.log(id);
    const responce = await fetch(`${API_URL}/profile/${id}`);
    const result = await responce.json();
    console.log(result);
    setProfileData(result);
  };
  useEffect(() => {
    userProfile();
  }, [id]);
  return (
    <div className="user-profile">
      {profileData ? (
        <div>
          <h1>{profileData.name}</h1>
          <p>@{profileData.username}</p>
          <p>{profileData.email}</p>
          <p>{profileData.gender}</p>
        </div>
      ) : (
        <p>Select a user to see profile details</p>
      )}
    </div>
  );
}

export default UserProfile;
