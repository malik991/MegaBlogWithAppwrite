import React, { useContext } from "react";
import UserContext from "../context/userContext";

function Profile() {
  // now we will get the data from userCOntext which is in provide like this
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div>
        <h2>please Login</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Welcome: {user.userName} </h2>
        <h2>Password: {user.password}</h2>
      </div>
    );
  }
}

export default Profile;
