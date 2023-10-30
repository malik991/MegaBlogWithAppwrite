import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom"; // use this hook to load data in out element like use state

function GitHub() {
  // one more method to load the data with optimization and write it on the same compont
  const countFOlloers = useLoaderData();
  //const [countFOlloers, setFollowers] = useState([]);

  // when page load this will mount the data on componenet
  // useEffect(() => {
  //   fetch("https://api.github.com/users/malik991")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       //console.log(data);
  //       setFollowers(data);
  //     });
  // }, []);

  return (
    <div className="bg-orange-500 m-4 p-4 text-center text-white text-3xl">
      GitHub Followers: {countFOlloers.followers}
      <div className="rounded-full bg-white w-40 h-40 mx-auto mt-4 overflow-hidden">
        <img
          src={countFOlloers.avatar_url}
          alt="malik profile pic"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}

export default GitHub;

// get more optimization instead of to use useEffect hook
export const githubInforLoader = async () => {
  const res = await fetch("https://api.github.com/users/malik991");
  return res.json();
};
