import React from "react";
import { Container, GitHubCompo } from "../components";

function Github() {
  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap justify-center">
          <div className="p-2 w-1/2">
            <GitHubCompo />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Github;
