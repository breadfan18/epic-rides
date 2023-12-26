import React from "react";
import { isEmailAddressValid } from "../../helpers";
import { ERN_PASSCODE } from "../../constants/constants";

export default function UserInput({
  Icon,
  name,
  placeholder,
  value,
  onChange,
  isEmail,
  isErnPasscode,
  onKeyDown,
}) {
  const valueCompleted = isEmail
    ? isEmailAddressValid(value)
    : isErnPasscode
    ? value === ERN_PASSCODE
    : value !== "";
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
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
