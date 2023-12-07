import React from "react";
import { Button } from "react-bootstrap";
import { MdModeEditOutline } from "react-icons/md";
import PropTypes from "prop-types";
export function EditButton({ disabled }) {
  return (
    <Button
      // variant="success"
      disabled={disabled}
      className="rounded-circle"
      style={{ border: "none", backgroundColor: "rgba(0, 0, 0, 0.09)" }}
    >
      <MdModeEditOutline />
    </Button>
  );
}
EditButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
