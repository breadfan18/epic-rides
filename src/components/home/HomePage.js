import React from "react";
import { Link } from "react-router-dom";
import { APP_COLOR_EPIC_RED } from "../../constants";

function HomePage() {
  return (
    <div className="jumbotron">
      <h2 className="sectionHeaders">Epic Rides Nepal</h2>
      <p>File Register</p>
      <Link
        to="explanations"
        className="btn btn-lg"
        style={{ backgroundColor: APP_COLOR_EPIC_RED, color: "white" }}
      >
        Learn more
      </Link>
    </div>
  );
}

export default HomePage;
