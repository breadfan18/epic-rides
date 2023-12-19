import React, { useState } from "react";
import "./Login.css";
import { AiOutlineUser } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { auth, signInEmailPwd } from "../../tools/firebase";
import SignUpForm from "./SignUpForm";
import { APP_COLOR_EPIC_RED } from "../../constants/constants";
import PasswordInput from "./PasswordInput";
import UserInput from "./UserInput";

export default function Login({ windowWidth }) {
  const [showPwd, setShowPwd] = useState(false);
  const [pwdType, setPwdType] = useState("password");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [signUp, setSignUp] = useState(true);

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
    name === "username" ? setUsername(value) : setPwd(value);
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
        <img
          src="https://i.imgur.com/M0W3075.png"
          alt=""
          style={{ height: "7rem" }}
        />
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
            username={username}
            pwd={pwd}
            pwdType={pwdType}
            togglePwdDisplay={togglePwdDisplay}
            showPwd={showPwd}
          />
        ) : (
          <form action="" className="userAndPwdForm">
            <UserInput
              Icon={AiOutlineUser}
              onChange={handleChange}
              name="username"
              placeholder="Email address"
              value={username}
            />
            <PasswordInput
              onChange={handleChange}
              pwd={pwd}
              pwdType={pwdType}
              togglePwdDisplay={togglePwdDisplay}
              showPwd={showPwd}
            />
            <Button
              className="loginSubmit btn btn-success"
              onClick={() => signInEmailPwd(auth, username, pwd)}
            >
              Sign In
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}
