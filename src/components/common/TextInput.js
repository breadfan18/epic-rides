import React from "react";
import PropTypes from "prop-types";
import {
  APP_COLOR_BLACK_OPACITY,
  APP_COLOR_EPIC_RED,
  CANCELLED_COLOR_RED,
} from "../../constants/constants";

const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  isCurrency,
  length,
}) => {
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
        {isCurrency && (
          <p
            style={{
              padding: "0 10px",
              backgroundColor: APP_COLOR_BLACK_OPACITY,
              marginBottom: 0,
              borderRadius: "0 0 0 10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            $
          </p>
        )}
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            // borderRadius: fieldBorderRadius,
            paddingLeft: isCurrency ? "5px" : "12px",
          }}
          maxLength={length}
          // minLength={length}
        />
      </div>
      {/* {error && (
        <div
          className="alert"
          role="alert"
          style={{
            backgroundColor: APP_COLOR_BLACK_OPACITY,
            color: APP_COLOR_EPIC_RED,
          }}
        >
          <p style={{ marginBottom: "0" }}>{error}</p>
        </div>
      )} */}
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
