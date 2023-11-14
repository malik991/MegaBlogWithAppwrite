import React from "react";
import { Container, GitHubCompo } from "../components";

function Github() {
  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div
            style={{ padding: "0.5rem", maxWidth: "400px", minWidth: "400px" }}
          >
            <GitHubCompo />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Github;
