import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbServiceObj from "../appwrite/configAppwrite";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../store/postThunkSlice";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.authName.userData);
  const allPosts = useSelector((state) => state.postThunk.posts);
  const status = useSelector((state) => state.postThunk.status);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      const getPost = allPosts.find((post) => post.$id === slug);
      if (getPost) {
        setPost(getPost);
      } else {
        navigate("/");
      }
      // dbServiceObj.getPost(slug).then((post) => {
      //   if (post) setPost(post);
      //   else navigate("/");
      // });
    } else navigate("/");
  }, [slug, navigate]);

  const handleDeletePost = () => {
    //dbServiceObj.deletePost(post.$id).then((data) => {
    //if (data) {
    // dbServiceObj.deleteFile(post.featuredImage);
    dispatch(deletePost({ post: post, userId: userData.$id }));
    if (status === "succeeded") {
      navigate("/all-posts");
    }

    //}
    // });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={dbServiceObj.filePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={handleDeletePost}
                disabled={status === "loading"} // when laoding disabl button
              >
                {status === "loading" ? "Delteing..." : "Delete"}
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
