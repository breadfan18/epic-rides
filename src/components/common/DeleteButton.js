import React from "react";
import { Button } from "react-bootstrap";
import { BsTrash3 } from "react-icons/bs";
import PropTypes from "prop-types";
import { APP_COLOR_EPIC_RED } from "../../constants";

export function DeleteButton({ onClick, disableBtn }) {
  return (
    <Button
      // variant="danger"
      onClick={onClick}
      className="rounded-circle"
      disabled={disableBtn}
      style={{ backgroundColor: APP_COLOR_EPIC_RED, border: "none" }}
    >
      <BsTrash3 />
    </Button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
