import React from "react";

//  create a context and store in a variable like use state
const UserContext = React.createContext();
// when u create the context it will give the provider like in Route-dom, after all
// it provide us a variable by export.
// than we will wrpae the componenets with UserContext like
//<UserContext> // this is wrapper
// <login />
// <card>
/// <Data />
//</card>
// </userCOntext>

export default UserContext;
