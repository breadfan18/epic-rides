import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import {
  APP_COLOR_EPIC_RED,
  CANCELLED_COLOR_RED,
} from "../../constants/constants";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";

const DateInput = ({
  name,
  label,
  onChange,
  value,
  error,
  disabled,
  funcToDispatch,
}) => {
  const dispatch = useDispatch();
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label
        htmlFor={name}
        className="inputLabels"
        style={{
          backgroundColor: error ? CANCELLED_COLOR_RED : "",
        }}
      >
        {label}
        {error && (
          <p
            style={{
              margin: "0 10px 0 0",
              fontSize: "0.8rem",
              color: APP_COLOR_EPIC_RED,
            }}
          >
            {error}
          </p>
        )}
      </label>
      <div className="field dateInputField">
        <Form.Control
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <div>
          <MdCancel
            onClick={() => value !== "" && dispatch(funcToDispatch(""))}
            style={{ fontSize: "1.2rem" }}
          />
        </div>
      </div>
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
