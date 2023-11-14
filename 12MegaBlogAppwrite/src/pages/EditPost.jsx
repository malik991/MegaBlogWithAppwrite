import React, { useState, useEffect } from "react";
import dbServiceObj from "../appwrite/configAppwrite";
import { Container, PostForms } from "../components";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const [load, setLoad] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      dbServiceObj
        .getPost(slug)
        .then((post) => {
          if (post) {
            setLoad(post);
          }
        })
        .catch((error) => {
          console.log("Error in EditPost Page:: ", error);
        });
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
