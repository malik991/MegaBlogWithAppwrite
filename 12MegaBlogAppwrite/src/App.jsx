import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
//import "./App.css";
import "../public/styles/style.css";
import authServieObj from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  // make a loading state when get data from DB or some other API for wait and
  // than conditionally render the data with if else
  const [loading, setLoading] = useState(true); // because we use useEffect()
  const dispatch = useDispatch();

  useEffect(() => {
    authServieObj
      .checkUser()
      .then((userData) => {
        if (userData && userData.$id) {
          //console.log("dispath from app.jsx login:");
          dispatch(login({ userData }));
        } else {
          // if you didn't get the data, update the state by user logout
          console.log("logout from login app.jsx:");
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("Error in App useEffect", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-scree flex flex-wrap content-between rounded-xl ">
      <div className="w-full block">
        <Header />
        <main className="my-2">
          {" "}
          <Outlet />{" "}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
