import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authServieObj from "../appwrite/auth";
import { Logo, Button } from "./index";
import InPut from "./Input";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const [btnClicked, setBtnClicked] = useState(false);

  async function signUp(data) {
    //console.log("sign up.jsx data value is: ", data);
    setError("");
    try {
      setBtnClicked(true);
      const session = await authServieObj.createAccount(data);
      if (session) {
        const userData = await authServieObj.checkUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      // Reset btnClicked to false after the asynchronous process is complete
      setBtnClicked(false);
    }
  }
  // const onCheck = (data) => {
  //   console.log("Form data submitted:", data);
  // };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="70px" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form className="mt-8" onSubmit={handleSubmit(signUp)}>
          <div className="space-y-5">
            <InPut
              label="Email"
              placeholder="enter email"
              type="email"
              {...register("email", {
                required: true,
                // validate: {
                //   pattern: (value) =>
                //     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                //     "Email address must be a valid address",
                // },
              })}
            />
            <InPut
              label="Password"
              type="password"
              placeholder="enter your password"
              {...register("password", {
                required: true,
                // validate: {
                //   pattern: (value) =>
                //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/.test(
                //       value
                //     ) ||
                //     "min 5 chracters, 1 uppercase and 1 digit i.e Masdfgq12",
                // },
              })}
            />
            <InPut
              label="Name"
              type="name"
              placeholder="enter your Name"
              {...register("name", {
                required: true,
              })}
            />

            <Button
              type="submit"
              className={`w-full ${
                btnClicked
                  ? "bg-gray-300 text-blue-700"
                  : "bg-blue-500 text-black"
              }`}
              disabled={btnClicked}
            >
              {btnClicked ? "Wait..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
