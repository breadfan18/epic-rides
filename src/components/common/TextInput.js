import React from "react";
import PropTypes from "prop-types";
import { DELETE_COLOR_RED } from "../../constants/constants";
import { useRequiredLabelPosition } from "../../hooks/useRequiredLabelPosition";

const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  length,
  requiredField,
  windowWidth,
  isAgentField,
}) => {
  const absoluteLeftValue = useRequiredLabelPosition(isAgentField);

  return (
    <div className="input-container" style={{ display: "flex" }}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          paddingLeft: "12px",
          border: error ? `2px solid ${DELETE_COLOR_RED}` : null,
        }}
        maxLength={length}
      />
      <label className="inputLabels" htmlFor={name}>
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

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  isCurrency: PropTypes.bool,
  error: PropTypes.string,
};

export default TextInput;
