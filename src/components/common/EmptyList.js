import React from "react";
import PropTypes from "prop-types";
import {
  APP_COLOR_BLACK_OPACITY,
  APP_COLOR_EPIC_RED,
} from "../../constants/constants";

const EmptyList = ({ dataType }) => {
  return (
    <div
      className="alert"
      role="alert"
      style={{
        backgroundColor: APP_COLOR_BLACK_OPACITY,
        color: APP_COLOR_EPIC_RED,
      }}
    >
      <p style={{ marginBottom: "0" }}>
        No {`${dataType}s`} to display. Add a new {dataType}.
      </p>
    </div>
  );
};

EmptyList.propTypes = {
  dataType: PropTypes.string.isRequired,
};

export default EmptyList;
