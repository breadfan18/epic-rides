import React from "react";
import PropTypes from "prop-types";
import { DELETE_COLOR_RED } from "../../constants/constants";

const NumberInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  requiredField,
}) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <div
        className="input-container transparentPlaceholderField"
        style={{ display: "flex" }}
      >
        <input
          type="number"
          min="0"
          inputmode="numeric"
          pattern="[0-9]*"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ border: error ? `2px solid ${DELETE_COLOR_RED}` : null }}
        />
        <label className="inputLabels" htmlFor={name}>
          {label}
          {requiredField && <p className="requiredField">Required</p>}
        </label>
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
