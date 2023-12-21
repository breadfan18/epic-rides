import React, { useState } from "react";
import UserInput from "./UserInput";
import PasswordInput from "./PasswordInput";
import { auth, signInEmailPwd } from "../../tools/firebase";
import { Button } from "react-bootstrap";
import { NEW_SIGN_IN_STATE } from "../../constants/constants";

export default function SignInForm({ Icon }) {
  const [userCreds, setUserCreds] = useState(NEW_SIGN_IN_STATE);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form action="" className="userAndPwdForm">
      <UserInput
        Icon={Icon}
        onChange={handleChange}
        name="email"
        placeholder="Email address"
        value={userCreds.email}
      />
      <PasswordInput
        name="pwd"
        onChange={handleChange}
        pwd={userCreds.pwd}
        placeholder="Password"
      />
      <Button
        className="loginSubmit"
        style={{ backgroundColor: "black", border: "5px solid black" }}
        onClick={() => signInEmailPwd(auth, userCreds.email, userCreds.pwd)}
      >
        Sign In
      </Button>
    </form>
  );
}
