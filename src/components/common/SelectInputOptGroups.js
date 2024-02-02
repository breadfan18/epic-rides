import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import {
  APP_COLOR_EPIC_RED,
  CANCELLED_COLOR_RED,
} from "../../constants/constants";

const SelectInputOptGroups = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options,
  bkgrdColor,
  disableDefaultOption = true,
  requiredField,
}) => {
  return (
    <div className="form-group">
      <label
        htmlFor={name}
        className="inputLabels"
        style={{
          backgroundColor: error ? CANCELLED_COLOR_RED : "",
        }}
      >
        {label}
        {requiredField && (
          <p
            style={{
              margin: "0 10px 0 0",
              fontSize: "0.8rem",
              color: APP_COLOR_EPIC_RED,
            }}
          >
            Required
          </p>
        )}
      </label>
      <Form.Select
        aria-label={defaultOption}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        style={{ backgroundColor: `${bkgrdColor}` }}
      >
        <option value="" disabled={disableDefaultOption}>
          {defaultOption}
        </option>
        <optgroup label="Clients">
          <option value={options[0].value}>{options[0].text}</option>
        </optgroup>
        <optgroup label="Agents">
          {options.splice(1, options.length - 1).map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </optgroup>
      </Form.Select>
    </div>
  );
};

SelectInputOptGroups.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  bkgrdColor: PropTypes.string,
  disableDefaultOption: PropTypes.bool,
};

export default SelectInputOptGroups;
