import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { auth, createAccount } from "../../tools/firebase";
import UserInput from "./UserInput";
import PasswordInput from "./PasswordInput";
import { AiOutlineUser } from "react-icons/ai";
import { APP_COLOR_EPIC_RED } from "../../constants/constants";

export default function SignUpForm({
  username,
  pwd,
  pwdType,
  togglePwdDisplay,
  showPwd,
}) {
  const NEW_USER = {
    firstName: "",
    lastName: "",
    email: "",
    pwd: "",
    confirmPwd: "",
  };

  const [user, setUser] = useState(NEW_USER);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form action="" className="userAndPwdForm">
      <UserInput
        Icon={AiOutlineUser}
        onChange={handleChange}
        name="firstName"
        placeholder="First Name"
        value={user.firstName}
      />
      <UserInput
        Icon={AiOutlineUser}
        onChange={handleChange}
        name="lastName"
        placeholder="Last Name"
        value={user.lastName}
      />
      <UserInput
        Icon={AiOutlineUser}
        onChange={handleChange}
        name="email"
        placeholder="Email address"
        value={user.email}
      />
      <PasswordInput
        name="pwd"
        onChange={handleChange}
        pwd={user.pwd}
        pwdType={pwdType}
        togglePwdDisplay={togglePwdDisplay}
        showPwd={showPwd}
        placeholder="Password"
      />
      <PasswordInput
        name="confirmPwd"
        onChange={handleChange}
        pwd={user.confirmPwd}
        pwdType={pwdType}
        togglePwdDisplay={togglePwdDisplay}
        showPwd={showPwd}
        placeholder="Confirm Password"
      />
      <Button
        className="loginSubmit btn"
        onClick={() => createAccount(auth, user)}
      >
        Sign Up
      </Button>
    </form>
  );
}
