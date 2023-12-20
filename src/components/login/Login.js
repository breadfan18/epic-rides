import React, { useState } from "react";
import "./Login.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { Button } from "react-bootstrap";
import { auth, signInEmailPwd } from "../../tools/firebase";
import SignUpForm from "./SignUpForm";
import {
  APP_COLOR_EPIC_RED,
  EPIC_LOGO,
  NEW_SIGN_IN_STATE,
} from "../../constants/constants";
import PasswordInput from "./PasswordInput";
import UserInput from "./UserInput";

export default function Login({ windowWidth }) {
  const [showPwd, setShowPwd] = useState(false);
  const [pwdType, setPwdType] = useState("password");
  const [userCreds, setUserCreds] = useState(NEW_SIGN_IN_STATE);
  const [signUp, setSignUp] = useState(false);

  function togglePwdDisplay() {
    if (pwdType === "password") {
      setPwdType("text");
      setShowPwd(!showPwd);
    } else {
      setPwdType("password");
      setShowPwd(!showPwd);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const activeStyle = {
    color: "white",
    backgroundColor: APP_COLOR_EPIC_RED,
  };

  return (
    <main id="loginMain">
      <section
        id="loginForm"
        style={{ padding: windowWidth > 450 ? "2rem" : "1rem" }}
      >
        <img src={EPIC_LOGO} alt="" style={{ height: "7rem" }} />
        <h1>Tour Manager</h1>
        <section id="loginFlowSelect">
          <div
            style={!signUp ? { ...activeStyle } : {}}
            active
            onClick={() => setSignUp(false)}
          >
            Sign In
          </div>
          <div
            style={signUp ? { ...activeStyle } : {}}
            onClick={() => setSignUp(true)}
          >
            Sign Up
          </div>
        </section>
        <hr />
        {signUp ? (
          <SignUpForm
            onChange={handleChange}
            pwdType={pwdType}
            togglePwdDisplay={togglePwdDisplay}
            showPwd={showPwd}
          />
        ) : (
          <form action="" className="userAndPwdForm">
            <UserInput
              Icon={MdAlternateEmail}
              onChange={handleChange}
              name="email"
              placeholder="Email address"
              value={userCreds.email}
            />
            <PasswordInput
              name="pwd"
              onChange={handleChange}
              pwd={userCreds.pwd}
              pwdType={pwdType}
              togglePwdDisplay={togglePwdDisplay}
              showPwd={showPwd}
              placeholder="Password"
            />
            <Button
              className="loginSubmit"
              style={{ backgroundColor: "black", border: "1px solid black" }}
              onClick={() =>
                signInEmailPwd(auth, userCreds.email, userCreds.pwd)
              }
            >
              Sign In
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}
