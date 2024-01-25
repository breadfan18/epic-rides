import React from "react";
import { Link } from "react-router-dom";
import { APP_COLOR_EPIC_RED } from "../../constants/constants";
import FileUploader from "../common/FileUploader";

function HomePage() {
  return (
    <div className="loginContainer">
      <h2 className="sectionHeaders">Epic Rides Nepal</h2>
      <p style={{ margin: "10px 5px" }}>
        Welcome to Epic Rides Nepal Tour Manager. This application is designed
        to seamlessly manage and streamline all Epic Ride tours, as well as all
        affiliated agents.
      </p>
      <p style={{ margin: "10px 5px" }}>
        Our eventual goal is to make sure that our cleints have a great time
        when booking their tour with Epic Rides.
      </p>
      <Link
        to="explanations"
        className="btn btn-lg"
        style={{ backgroundColor: APP_COLOR_EPIC_RED, color: "white" }}
      >
        Learn more
      </Link>
      <FileUploader />
    </div>
  );
}

export default HomePage;
