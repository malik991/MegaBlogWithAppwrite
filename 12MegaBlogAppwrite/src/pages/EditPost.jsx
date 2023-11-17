import React, { useState, useEffect } from "react";
import dbServiceObj from "../appwrite/configAppwrite";
import { Container, PostForms } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
  const [load, setLoad] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.postThunk.posts);
  useEffect(() => {
    if (slug) {
      const findSpecificPost = posts.find((post) => post.$id === slug);
      if (findSpecificPost) {
        setLoad(findSpecificPost);
      }
      // dbServiceObj
      //   .getPost(slug)
      //   .then((post) => {
      //     if (post) {
      //       setLoad(post);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("Error in EditPost Page:: ", error);
      //   });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return load ? (
    <div className="py-8">
      <Container>
        <PostForms postDataValue={load} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
