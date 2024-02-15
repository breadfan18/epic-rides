import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { DELETE_COLOR_RED } from "../../constants/constants";
import { useRequiredLabelPosition } from "../../hooks/useRequiredLabelPosition";

const SelectInput = ({
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
  isAgentField,
}) => {
  const absoluteLeftValue = useRequiredLabelPosition(isAgentField);

  return (
    <div className="input-container">
      <Form.Select
        aria-label={defaultOption}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        style={{
          backgroundColor: `${bkgrdColor}`,
          height: "60px",
          border: error ? `2px solid ${DELETE_COLOR_RED}` : null,
        }}
      >
        <option value="" disabled={disableDefaultOption}>
          {defaultOption}
        </option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </Form.Select>
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

SelectInput.propTypes = {
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

export default SelectInput;
