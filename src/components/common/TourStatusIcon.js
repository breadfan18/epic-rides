import React from "react";
import {
  TbSquareRoundedCheckFilled,
  TbSquareRoundedChevronsRightFilled,
  TbSquareRoundedXFilled,
} from "react-icons/tb";
import {
  APP_COLOR_EPIC_RED,
  DELETE_COLOR_RED,
  EDIT_COLOR_GREEN,
} from "../../constants";
import PropTypes from "prop-types";

export default function TourStatusIcon({ tourStatus, iconSize }) {
  const getComponent = (status) => {
    switch (status) {
      case "HK":
        return (
          <TbSquareRoundedCheckFilled
            style={{
              color: EDIT_COLOR_GREEN,
              fontSize: iconSize,
            }}
          />
        );
      case "OP":
        return (
          <TbSquareRoundedChevronsRightFilled
            style={{ color: APP_COLOR_EPIC_RED, fontSize: iconSize }}
          />
        );
      case "":
        return (
          <TbSquareRoundedChevronsRightFilled
            style={{ color: APP_COLOR_EPIC_RED, fontSize: iconSize }}
          />
        );
      case "CA":
        return (
          <TbSquareRoundedXFilled
            style={{ color: DELETE_COLOR_RED, fontSize: iconSize }}
          />
        );
      default:
        return null;
    }
  };

  const foo = getComponent(tourStatus);
  return foo;
}
TourStatusIcon.propTypes = {
  bonusEarned: PropTypes.bool || undefined,
  iconSize: PropTypes.string,
};
