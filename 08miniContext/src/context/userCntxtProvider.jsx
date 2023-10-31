import React, { useState } from "react";
import UserContext from "./userContext";

// this is our context provide in .jsx coz now we will wrappe the concern component
// in the UserContext so they all will access the cariable of UserContext.

// here we define provide as a method and pass the children like Outlet mean jo b parent
// sy data aa rha hy usy as it is pass krva do this is the concept of children.
const UserContextProvide = ({ children }) => {
  // even if u wanna call an api or Db just get the data and forward it as mention below
  const [user, setUser] = useState(null);
  return (
    // now we will wrap in provide and give the access of contxt variable value to all our child or comps
    // pass a value in an object. you can pass any multiple value in this object  value={{user, setUser}}
    <UserContext.Provider value={{ user, setUser }}>
      {/* pass the child as it is it might be card or dash board conponent */}
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvide;
