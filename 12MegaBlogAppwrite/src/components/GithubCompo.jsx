import React from "react";
import { useLoaderData } from "react-router-dom";

export default function GitHubCompo() {
  const githubData = useLoaderData();
  if (githubData) {
    console.log("github Data:: ", githubData.login);
    return (
      <div className="rounded-2xl relative p-6 bg-blue-200 my-10 h-52 shadow-md text-left">
        <div className="relative h-24 w-full bg-teal-400 rounded-tl-2xl rounded-tr-2xl flex items-center">
          <h2 className="text-2xl text-gray-700 flex-1 my-16 mx-4">
            {githubData.name}
          </h2>
          <img
            className="my-30 mx-20 relative w-32 h-32 border-4 border-white rounded-full"
            src={githubData.avatar_url}
            alt="malik profile pic"
          />
        </div>
        <div className="mt-5">
          <p className="my-3 text-teal-600">{githubData.location}</p>
          <p className="my-3 text-teal-600">{githubData.login}</p>
        </div>
      </div>
      // <div className="bg-orange-500 m-4 p-4 text-center text-white text-3xl">
      //   GitHub Followers: {githubData.followers}
      //   <div className="rounded-full bg-white w-40 h-40 mx-auto mt-4 overflow-hidden">
      //     <img
      //       src={githubData.avatar_url}
      //       alt="malik profile pic"
      //       width={200}
      //       height={200}
      //     />
      //   </div>
      // </div>
    );
  }
}

export const githubInfoLoader = async () => {
  const res = await fetch("https://api.github.com/users/malik991");
  return res.json();
};
