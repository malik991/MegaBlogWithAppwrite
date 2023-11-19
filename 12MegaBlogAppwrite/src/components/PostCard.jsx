import React from "react";
import dbServiceObj from "../appwrite/configAppwrite";
import { Link } from "react-router-dom";

// $id is a parameter which requiremet of appWrite, otherwise we will pass simple id
function PostCard({ $id, title, featuredImage }) {
  // console.log("title value postCard: ", title);
  return (
    // clickable card so use link
    <Link to={`/post/${$id}`}>
      <div className="w-full shadow-lg ring-inherit bg-[#FAF0D7] rounded-xl p-4">
        <div className="w-full justify-center mb-4 ">
          <img
            src={dbServiceObj.filePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
