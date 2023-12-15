import React from "react";
import "./Login.css";
import SocialLoginButton from "./SocialLoginButton";
import { FcGoogle } from "react-icons/fc";

export default function Login({ windowWidth }) {
  return (
    <main id="loginMain">
      <section
        id="loginForm"
        style={{ padding: windowWidth > 450 ? "2rem" : "1rem" }}
      >
        <div id="socialLogin">
          <img src="https://i.imgur.com/M0W3075.png" alt="" />
          <h1>Tour Manager</h1>
          <hr />
          <p style={{ marginBottom: "8px" }}>Login with Google</p>
          <SocialLoginButton
            Icon={FcGoogle}
            loginType="google"
            btnColor={"white"}
            btnDisabled={false}
          />
        </div>
      </section>
    </main>
  );
}
