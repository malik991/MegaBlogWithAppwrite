import React, { useEffect, useState } from "react";
import dbServiceObj from "../appwrite/configAppwrite";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/postSlice";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postName.posts);
  const status = useSelector((state) => state.postName.status);
  //const authStatus = useSelector((state) => state.authName.status);
  //const [posts, setPosts] = useState([]);
  useEffect(() => {
    //mount data every time when this componenet will load
    dispatch(fetchPosts());
    // dbServiceObj
    //   .getAllPosts()
    //   .then((data) => {
    //     if (data) {
    //       setPosts(data.documents);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error in Home page:: ", err);
    //   });
  }, [dispatch]);

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
  } else if (posts.length === 0) {
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
