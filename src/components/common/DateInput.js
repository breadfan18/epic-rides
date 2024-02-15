import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import {
  APP_COLOR_EPIC_RED,
  DELETE_COLOR_RED,
} from "../../constants/constants";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useRequiredLabelPosition } from "../../hooks/useRequiredLabelPosition";

const DateInput = ({
  name,
  label,
  onChange,
  value,
  error,
  disabled,
  funcToDispatch,
  requiredField,
  isAgentField,
}) => {
  const absoluteLeftValue = useRequiredLabelPosition(isAgentField);
  const dispatch = useDispatch();
  return (
    <div className="input-container">
      <Form.Control
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          border: error ? `2px solid ${DELETE_COLOR_RED}` : null,
        }}
      />
      {error && (
        <p
          style={{
            margin: 0,
            fontSize: "0.8rem",
            color: APP_COLOR_EPIC_RED,
          }}
        >
          {error}
        </p>
      )}
      {/* <div>
          <MdCancel
            onClick={() => value !== "" && dispatch(funcToDispatch(""))}
            style={{ fontSize: "1.2rem" }}
          />
        </div> */}
      <label htmlFor={name} className="inputLabels">
        {label}
        {requiredField && (
          <p className="requiredField" style={{ left: absoluteLeftValue }}>
            Required
          </p>
        )}
      </label>
    </div>
  );
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default DateInput;
