import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  APP_COLOR_BLACK_OPACITY,
  APP_COLOR_EPIC_RED,
  CANCELLED_COLOR_RED,
} from "../../constants/constants";
import Form from "react-bootstrap/Form";
import { useRequiredLabelPosition } from "../../hooks/useRequiredLabelPosition";

/* 
Need to figure out where to put the range checkbox.. and make sure this field 
alings with the deisgn of other input fields
*/

const PaxRangeInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  isAgentField,
}) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  const absoluteLeftValue = useRequiredLabelPosition(isAgentField);

  const [isRange, setIsRange] = useState(value.includes("-") ? true : false);
  const [startValue, setStartValue] = useState(
    value.includes("-") ? value.split(" - ")[0] : ""
  );
  const [endValue, setEndValue] = useState(
    value.includes("-") ? value.split(" - ")[1] : ""
  );

  const handleRangeCheckbox = (event) => {
    const isChecked = event.target.checked;
    setIsRange(isChecked);

    // Reset range values when switching between single number and range
    // if (!isChecked) {
    //   setStartValue("");
    //   setEndValue("");
    // }
  };

  return (
    <div className="input-container">
      <div
        className="field transparentPlaceholderField"
        style={{ display: "flex" }}
      >
        {isRange ? (
          <>
            <input
              type="number"
              min="0"
              inputmode="numeric"
              pattern="[0-9]*"
              name="paxLowRange"
              className="form-control"
              placeholder="Lower Range"
              value={startValue}
              onChange={onChange}
            />
            <p
              style={{
                minWidth: "5rem",
                margin: 0,
                textAlign: "center",
                backgroundColor: APP_COLOR_BLACK_OPACITY,
              }}
            >
              TO
            </p>
            <input
              type="number"
              min="0"
              inputmode="numeric"
              pattern="[0-9]*"
              name={"paxHighRange"}
              className="form-control"
              placeholder={"Upper Range"}
              value={endValue}
              onChange={onChange}
            />
          </>
        ) : (
          <input
            type="number"
            min="0"
            inputmode="numeric"
            pattern="[0-9]*"
            name={name}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
      <label
        htmlFor={name}
        className="inputLabels"
        style={{
          backgroundColor: error ? CANCELLED_COLOR_RED : "",
        }}
      >
        {label}
        <Form.Check
          // className="requiredField"
          type="switch"
          id="paxRangeCheck"
          label="Range"
          onChange={handleRangeCheckbox}
          checked={isRange}
          style={{ left: absoluteLeftValue }}
          //   margin: "0 10px 0 0",
          //   color: APP_COLOR_EPIC_RED,
          //   fontSize: "0.8rem",
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          // }}// style={{
        />
      </label>
    </div>
  );
};

PaxRangeInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  isCurrency: PropTypes.bool,
  error: PropTypes.string,
};

export default PaxRangeInput;
