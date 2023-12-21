import React from "react";
import { isEmailAddressValid } from "../../helpers";

export default function UserInput({
  Icon,
  name,
  placeholder,
  value,
  onChange,
  isEmail,
}) {
  const valueCompleted = isEmail ? isEmailAddressValid(value) : value !== "";
  return (
    <div className="login-form-group">
      <Icon
        className="loginLabels"
        style={{ color: valueCompleted && "green" }}
      />
      <input
        name={name}
        className="userAndPwdInput"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
