import React from "react";
import { AiFillLock } from "react-icons/ai";
import { ImEyeBlocked, ImEye } from "react-icons/im";

export default function PasswordInput({
  name,
  onChange,
  pwd,
  pwdType,
  togglePwdDisplay,
  showPwd,
}) {
  return (
    <div className="login-form-group">
      <AiFillLock className="loginLabels" />
      <input
        name={name}
        id="pwdField"
        className="userAndPwdInput"
        type={pwdType}
        placeholder="Password"
        value={pwd}
        onChange={onChange}
      />
      {showPwd ? (
        <ImEyeBlocked id="togglePwd" onClick={togglePwdDisplay} />
      ) : (
        <ImEye id="togglePwd" onClick={togglePwdDisplay} />
      )}
    </div>
  );
}
