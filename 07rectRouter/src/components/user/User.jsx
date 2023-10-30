import React from "react";
// use params is used to get the value from URL paramaeter
import { useParams } from "react-router-dom";

function User() {
  const { userId } = useParams(); // userId will be the same name to pass on main.jsx
  return (
    <div className="bg-orange-700 p-4 text-white text-3xl">User: {userId}</div>
  );
}

export default User;
