import React, { useState } from "react";
import UserInput from "./UserInput";
import Error from "../common/Error";
import PasswordInput from "./PasswordInput";
import { signInEmailPwd } from "../../tools/firebase";
import { Button } from "react-bootstrap";
import { NEW_SIGN_IN_STATE } from "../../constants/constants";
import { setLoginErrorText } from "../../helpers";

export default function SignInForm({ Icon }) {
  const [userCreds, setUserCreds] = useState(NEW_SIGN_IN_STATE);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = async () => {
    const signInError = await signInEmailPwd(userCreds.email, userCreds.pwd);
    if (signInError) setError(setLoginErrorText(await signInError));
  };

  const handleSaveOnEnter = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const signInError = await signInEmailPwd(userCreds.email, userCreds.pwd);
      if (signInError) setError(setLoginErrorText(await signInError));
    }
  };

  return (
    <form action="" className="userAndPwdForm" onKeyDown={handleSaveOnEnter}>
      {error && <Error errorMessage={error} />}
      <UserInput
        Icon={Icon}
        onChange={handleChange}
        name="email"
        placeholder="Email address"
        value={userCreds.email}
        isEmail
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
        onClick={() => handleSignIn()}
      >
        Sign In
      </Button>
    </form>
  );
}
