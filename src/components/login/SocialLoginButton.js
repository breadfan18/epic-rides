import React from "react";
import { Button } from "react-bootstrap";
import { auth, login } from "../../tools/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { APP_COLOR_EPIC_RED } from "../../constants/constants";

export default function SocialLoginButton({ Icon, btnColor, btnDisabled }) {
  // The handle login function specifically uses the google login function right now
  // In the future, when more sign in features are implemented, we need to change this.
  const history = useHistory();
  function handleLogin() {
    login(auth).then(() => {
      history.push("/tours");
    });
  }
  return (
    <Button
      style={{
        backgroundColor: btnColor,
        borderRadius: "10px",
        marginBottom: "8px",
        padding: "5px",
        border: "4px solid " + APP_COLOR_EPIC_RED,
      }}
      disabled={btnDisabled}
      onClick={handleLogin}
    >
      <Icon style={{ fontSize: "2.5rem", color: "white" }} />
    </Button>
  );
}
