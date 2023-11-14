import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Login, ProtectedLayout } from "./components/index.js";
import SignUp from "./pages/SignUp.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import AddPost from "./pages/AddForm.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import Github from "./pages/Github.jsx";
import { githubInfoLoader } from "./components/GithubCompo.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: (
//           <ProtectedLayout authentication={false}>
//             <Login />
//           </ProtectedLayout>
//         ),
//       },
//       {
//         path: "/signup",
//         element: (
//           <ProtectedLayout authentication={false}>
//             <SignUp />
//           </ProtectedLayout>
//         ),
//       },
//       {
//         path: "/all-posts",
//         element: (
//           <ProtectedLayout authentication>
//             {" "}
//             <AllPosts />
//           </ProtectedLayout>
//         ),
//       },
//       {
//         path: "/add-post",
//         element: (
//           <ProtectedLayout authentication>
//             {" "}
//             <AddPost />
//           </ProtectedLayout>
//         ),
//       },
//       {
//         path: "/edit-post/:slug",
//         element: (
//           <ProtectedLayout authentication>
//             {" "}
//             <EditPost />
//           </ProtectedLayout>
//         ),
//       },
//       {
//         path: "/post/:slug",
//         element: <Post />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <ProtectedLayout authentication={false}>
            <Login />
          </ProtectedLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedLayout authentication={false}>
            <SignUp />
          </ProtectedLayout>
        }
      />
      <Route
        path="/all-posts"
        element={
          <ProtectedLayout authentication>
            <AllPosts />
          </ProtectedLayout>
        }
      />
      <Route
        path="/add-post"
        element={
          <ProtectedLayout authentication>
            <AddPost />
          </ProtectedLayout>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <ProtectedLayout authentication>
            <EditPost />
          </ProtectedLayout>
        }
      />
      <Route
        loader={githubInfoLoader}
        path="/github"
        element={
          <ProtectedLayout authentication>
            <Github />
          </ProtectedLayout>
        }
      />
      <Route path="/post/:slug" element={<Post />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>{/* <App /> */}</RouterProvider>
    </Provider>
  </React.StrictMode>
);
