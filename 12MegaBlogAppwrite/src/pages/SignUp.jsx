import React from "react";
import { Signup as SignupComponent } from "../components";

function SignUp() {
  console.log("signup page");
  return (
    <div className="py-8">
      <SignupComponent />
    </div>
  );
}

export default SignUp;
