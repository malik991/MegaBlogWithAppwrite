import React from "react";
import { useLoaderData } from "react-router-dom";

export default function GitHubCompo() {
  const githubData = useLoaderData();
  if (githubData) {
    console.log("github Data:: ", githubData.login);
    return (
      <div className="gcard">
        <div className="gtop">
          <h2 className="gname">{githubData.name}</h2>
          <img
            className="gcircle-img"
            src={githubData.avatar_url}
            alt="malik profile pic"
          />
        </div>
        <div className="gbottom">
          <p className="ginfo">{githubData.location}</p>
          <p className="ginfo">{githubData.login}</p>
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
