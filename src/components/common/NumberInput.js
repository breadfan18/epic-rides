import React from "react";
import PropTypes from "prop-types";
import { APP_COLOR_EPIC_RED, CANCELLED_COLOR_RED } from "../../constants";

const NumberInput = ({ name, label, onChange, placeholder, value, error }) => {
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
              color: APP_COLOR_EPIC_RED,
              fontSize: "0.8rem",
            }}
          >
            Required
          </p>
        )}
      </label>
      <div className="field" style={{ display: "flex" }}>
        <input
          type="number"
          pattern="[0-9]"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  isCurrency: PropTypes.bool,
  error: PropTypes.string,
};

export default NumberInput;
