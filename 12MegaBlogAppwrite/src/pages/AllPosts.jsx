import React, { useState, useEffect } from "react";
import dbServiceObj from "../appwrite/configAppwrite";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, logOut } from "../store/postThunkSlice";
import { logout } from "../store/authSlice";

function AllPosts() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authName.userData);

  //const [load, setLoad] = useState([]);
  //const load = useSelector((state) => state.postThunk.posts);
  const load = useSelector((state) => state.postThunk.userPosts[userData?.$id]);
  const status = useSelector((state) => state.postThunk.status);
  useEffect(() => {
    // if load is undefined or epmty and user authenticate than it will run
    if (!load?.length && userData) {
      //console.log("enter useEffect Allpost.jsx");
      dispatch(fetchPosts(userData.$id));
    }
    // if (userData && userData.$id === null) {
    //   dispatch(logOut());
    //   dispatch(logout());
    // }
  }, [dispatch, userData, load]);
  //console.log("from all post page: ", userData.$id);
  if (status === "loading") {
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
  }
  if (status === "idle") {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Please Create Posts ..
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  if (load && userData.$id) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {load.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                {
                  <PostCard
                    $id={post.$id}
                    title={post.title}
                    featuredImage={post.featuredImage}
                  />
                }
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default AllPosts;
