import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { CANCELLED_COLOR_RED } from "../../constants/constants";

const DateInput = ({ name, label, onChange, value, error, disabled }) => {
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
      </label>
      <div className="field">
        <Form.Control
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {error && <div className="alert alert-danger">{error}</div>}
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
