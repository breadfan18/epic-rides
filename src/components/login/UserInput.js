import React from "react";

export default function UserInput({
  Icon,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="login-form-group">
      <Icon className="loginLabels" />
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
