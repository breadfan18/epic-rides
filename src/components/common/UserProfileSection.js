import React from "react";
import { auth } from "../../tools/firebase";
import { GoSignOut } from "react-icons/go";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { userLogout } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { APP_COLOR_EPIC_RED } from "../../constants";

function UserProfileSection({ user, userLogout }) {
  const history = useHistory();

  function handleSignOut() {
    userLogout(auth);
    localStorage.removeItem("selectedUser");
    history.push("/signin");
  }
  return (
    <section id="userImg">
      <img
        src={user.photoURL}
        alt=""
        style={{
          borderRadius: "50%",
          height: "2.7rem",
          border: `2px solid white`,
        }}
        title={user.displayName}
      />
      <GoSignOut
        onClick={handleSignOut}
        style={{
          fontSize: "2rem",
          cursor: "pointer",
          marginLeft: "5px",
          color: APP_COLOR_EPIC_RED,
        }}
        title="Sign Out"
      />
    </section>
  );
}

const mapDispatchToProps = {
  userLogout,
};

export default connect(null, mapDispatchToProps)(UserProfileSection);
