import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { InPut, Button, Logo } from "./index";
import authServieObj from "../appwrite/auth";
import { useForm } from "react-hook-form"; // this is the main hook by which we will use forms
import { DevTool } from "@hookform/devtools";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, control, formState } = useForm(); // control use for devTool
  const [error, setError] = useState("");
  const [btnClicked, setBtnClicked] = useState(false);
  const { errors } = formState; // hook field errors
  // login function
  const loginFun = async (data) => {
    console.log("function called", data);
    //setError(errors.email?.message);
    // whenever u submit any form should clean all the errors
    //console.log("in login.jsx data value of each field: ", data);
    setError("");
    try {
      // chec btn clicked and change its appearence
      setBtnClicked(true);
      // login provide use the session, if succesfuly loged in
      const session = await authServieObj.login(data);
      if (session) {
        const userData = await authServieObj.checkUser();
        if (userData) {
          //console.log("if part login");
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error is: ", error);
      setError(error.message);
    } finally {
      // Reset btnClicked to false after the asynchronous process is complete
      setBtnClicked(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="70px" />
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

        <form className="mt-8" onSubmit={handleSubmit(loginFun)} noValidate>
          <div className="space-y-5">
            {/* // here we have to use JS code, coz we use useForm, every time when
              // we use Input component mention ...register , otherwise values will be override
              // ...register("Email"), name Email should be unique, coz it is the data which pass
              // in login(data), so every time name will be unique likw eamil, passsword etc
              // 2nd argument is an object of options alot of options availble in documnetion of useHook form */}
            <InPut
              label="E-mail:"
              placeholder="Enter your Email !"
              type="email"
              //id="email"
              {...register("email", {
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid Email formate",
                },
                required: {
                  value: true,
                  message: "email required",
                },
              })}
            />
            {errors.email?.message && (
              <p className="text-red-600 text-left">{errors.email.message}</p>
            )}
            <InPut
              label="Password"
              type="password"
              placeholder="Enter your password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is mendatory",
                },
                // pattern: {
                //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/,
                //   message:
                //     "min 5 chracters, 1 uppercase and 1 digit i.e Masdfgq12",
                // },
              })}
            />
            {errors.password?.message && (
              <p className="text-red-600 mt-0 text-left">
                {errors.password.message}
              </p>
            )}
            <Button
              type="submit"
              className={`w-full ${
                btnClicked
                  ? "bg-gray-300 text-blue-700"
                  : "bg-blue-500 text-black"
              }`}
              disabled={btnClicked}
            >
              {btnClicked ? "Wait..." : "Sign in"}
            </Button>
          </div>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
}

export default Login;
