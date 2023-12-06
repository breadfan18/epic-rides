import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="jumbotron">
      <h2 className="sectionHeaders">Epic Rides Nepal</h2>
      <p>File Register</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
    </div>
  );
}


export default HomePage;
