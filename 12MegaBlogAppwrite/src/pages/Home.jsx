import React, { useEffect, useState } from "react";
import dbServiceObj from "../appwrite/configAppwrite";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, logOut } from "../store/postThunkSlice";
import { logout } from "../store/authSlice";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postThunk.posts);
  const status = useSelector((state) => state.postThunk.status);
  const userData = useSelector((state) => state.authName.userData);
  //const authStatus = useSelector((state) => state.authName.status);
  //const [posts, setPosts] = useState([]);
  useEffect(() => {
    //mount data every time when this componenet will load
    console.log("data useEffect home.jsx");
    if (userData && userData.$id) {
      dispatch(fetchPosts());
    } else {
      dispatch(logOut());
      dispatch(logout());
    }
  }, [dispatch]);

  if (status === "loading" && userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Loading ...
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
