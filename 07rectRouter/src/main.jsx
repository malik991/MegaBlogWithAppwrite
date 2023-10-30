import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/home/Home.jsx";
import About from "./components/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";
import User from "./components/user/User.jsx";
import GitHub, { githubInforLoader } from "./components/gitHub/GitHub.jsx";
import TestAbout from "./components/about/TestAbout.jsx";

// one method with array and nesting objects
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     // now we are create the nesting obj for contact about page so thats why we create an array
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       },
//       {
//         path: "about", // do not use / coz on parent we mentioned "/"
//         element: <About />,
//       },
//       {
//         path: "contact",
//         element: <Contact />,
//       },
//     ],
//   },
// ]);

////// 2nd method to create router with latest syntex
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* again using nesting as above object but not use array and js obj like done above */}
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />}>
        <Route path="test" element={<TestAbout />} />
      </Route>
      {/* check one more step further nesting */}

      <Route path="contact" element={<Contact />} />
      <Route path="user/:userId" element={<User />} />

      <Route
        // we use loader for optimization. when user take the cursor on the link
        // it will automatically load ur data from api or DB b4 click :)
        loader={githubInforLoader}
        path="github"
        element={<GitHub />}
      />
    </Route>
  )
);

//console.log("routing Configuration: ", router);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* coz we r using react router dom so we use just following instead of <App /> */}
    {/* router provide is a wrapper where eery route is erapped up */}
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
