import React from "react";
import { useDispatch } from "react-redux";
import authServieObj from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { logOut as postLogOut } from "../../store/postThunkSlice";

function Logout() {
  const dispatch = useDispatch();

  // define handle log out
  function handleLogout() {
    authServieObj.logout().then(() => {
      dispatch(logout()); // update the status of my states in slice
      dispatch(postLogOut());
    });
  }
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
