import { Button } from "react-bootstrap";
import React from "react";
import { auth, createAccount } from "../../tools/firebase";
import UserInput from "./UserInput";
import PasswordInput from "./PasswordInput";
import { AiOutlineUser } from "react-icons/ai";

export default function SignUpForm({
  onChange,
  username,
  pwd,
  pwdType,
  togglePwdDisplay,
  showPwd,
}) {
  return (
    <form action="" className="userAndPwdForm">
      <UserInput
        Icon={AiOutlineUser}
        onChange={onChange}
        name="firstName"
        placeholder="First Name"
        value={username}
      />
      <UserInput
        Icon={AiOutlineUser}
        onChange={onChange}
        name="lastName"
        placeholder="Last Name"
        value={username}
      />
      <UserInput
        Icon={AiOutlineUser}
        onChange={onChange}
        name="username"
        placeholder="Email address"
        value={username}
      />
      <PasswordInput
        name="pwd"
        onChange={onChange}
        pwd={pwd}
        pwdType={pwdType}
        togglePwdDisplay={togglePwdDisplay}
        showPwd={showPwd}
        placeholder="Password"
      />
      <PasswordInput
        name="confirmPwd"
        onChange={onChange}
        pwd={pwd}
        pwdType={pwdType}
        togglePwdDisplay={togglePwdDisplay}
        showPwd={showPwd}
        placeholder="Confirm Password"
      />
      <Button
        className="loginSubmit btn"
        onClick={() => createAccount(auth, username, pwd)}
      >
        Sign Up
      </Button>
    </form>
  );
}
