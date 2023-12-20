import React, { useState } from "react";
import "./Login.css";
import { MdAlternateEmail } from "react-icons/md";
import SignUpForm from "./SignUpForm";
import { APP_COLOR_EPIC_RED, EPIC_LOGO } from "../../constants/constants";
import SignInForm from "./SignInForm";

export default function Login({ windowWidth }) {
  const [showPwd, setShowPwd] = useState(false);
  const [pwdType, setPwdType] = useState("password");
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
            pwdType={pwdType}
            togglePwdDisplay={togglePwdDisplay}
            showPwd={showPwd}
          />
        ) : (
          <SignInForm
            Icon={MdAlternateEmail}
            pwdType={pwdType}
            showPwd={showPwd}
            togglePwdDisplay={togglePwdDisplay}
          />
        )}
      </section>
    </main>
  );
}
