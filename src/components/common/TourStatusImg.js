import React from "react";
import PropTypes from "prop-types";
import {
  TOUR_CANCELLED_IMG,
  TOUR_CONFIRMED_IMG,
  TOUR_WIP_IMG,
} from "../../constants/constants";

export default function TourStatusImg({ tourStatus }) {
  function getStatusImage(status) {
    switch (status) {
      case "HK":
        return TOUR_CONFIRMED_IMG;
      case "CA":
        return TOUR_CANCELLED_IMG;
      default:
        return TOUR_WIP_IMG;
    }
  }

  return (
    <img
      src={getStatusImage(tourStatus)}
      alt=""
      style={{
        height: "5.5rem",
        width: "5.5rem",
        marginRight: "15px",
        transform: `rotate(${tourStatus === "OP" ? "16" : "34"}deg)`,
      }}
    />
  );
}
TourStatusImg.propTypes = {
  tourStatus: PropTypes.string || undefined,
  iconSize: PropTypes.string,
};
