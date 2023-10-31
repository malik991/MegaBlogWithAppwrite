import React, { useState, useContext } from "react";
import UserContext from "../context/userContext";

function Login() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  // now we will get the method of setUser from userCOntextProvide to set the
  //value in its user vaiable
  const { setUser } = useContext(UserContext);

  // handle submit
  function handleSubmit(e) {
    e.preventDefault();
    // now send the data where it call or add this componenet
    setUser({ userName, password });
  }
  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={userName}
        onChange={(e) => setuserName(e.target.value)}
        placeholder="userName"
      />{" "}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Login;
