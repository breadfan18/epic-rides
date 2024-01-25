import React from "react";
import "./Spinner.css";

export function Spinner_Bike() {
  return (
    <div id="bike-container">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/26344/bike_wheel-512.png"
        class="thing-to-spin"
        alt="Loading..."
      />
    </div>
  );
}
