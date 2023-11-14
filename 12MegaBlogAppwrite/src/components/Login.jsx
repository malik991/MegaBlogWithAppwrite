import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { InPut, Button, Logo } from "./index";
import authServieObj from "../appwrite/auth";
import { useForm } from "react-hook-form"; // this is the main hook by which we will use forms

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  // login function
  const loginFun = async (data) => {
    // whenever u submit any form should clean all the errors
    //console.log("in login.jsx data value of each field: ", data);
    setError("");
    try {
      // login provide use the session, if succesfuly loged in
      const session = await authServieObj.login(data);
      if (session) {
        const userData = await authServieObj.checkUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {/* here handleSubmit is key word and a function and an event comes from hook-form and it get
         your function like login where form will be submitted , now do not need
         to manage state of your inputs hook-form manage it itself*/}
        <form className="mt-8" onSubmit={handleSubmit(loginFun)}>
          <div className="space-y-5">
            <InPut
              lanel="Email: "
              placeholder="Enter your Email !"
              type="email"
              // here we have to use JS code, coz we use useForm, every time when
              // we use Input component mention ...register , otherwise values will be override
              // ...register("Email"), name Email should be unique, coz it is the data which pass
              // in login(data), so every time name will be unique likw eamil, passsword etc
              // 2nd argument is an object of options alot of options availble in documnetion of useHook form
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
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
