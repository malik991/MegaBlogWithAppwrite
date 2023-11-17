import React from "react";
import { Container, GitHubCompo } from "../components";

function Github() {
  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <GitHubCompo />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Github;
