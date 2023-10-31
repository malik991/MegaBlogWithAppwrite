import "./App.css";
import Login from "./components/login";
import Profile from "./components/profile";
import UserContextProvide from "./context/userCntxtProvider";

function App() {
  return (
    // now we will use the provide in app or main.jsx as up to u. and wrap into it
    <UserContextProvide>
      <h1>Learn to context API</h1>
      {/* add our componenet here now */}
      <Login />
      <Profile />
    </UserContextProvide>
  );
}

export default App;
