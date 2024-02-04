import React from "react";
import { auth } from "../../tools/firebase";
import { GoSignOut } from "react-icons/go";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { userLogout } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import {
  APP_COLOR_EPIC_RED,
  USER_STOCK_IMG,
  USER_STOCK_IMG_WHITE_BKGRD,
} from "../../constants/constants";

function UserProfileSection({ user, userLogout, smallNav }) {
  const history = useHistory();

  function handleSignOut() {
    userLogout(auth);
    history.push("/signin");
  }

  const stockImg = smallNav ? USER_STOCK_IMG_WHITE_BKGRD : USER_STOCK_IMG;

  return (
    <section id="userImg" style={{ marginRight: smallNav ? null : "10px" }}>
      <img
        src={user.photoURL || stockImg}
        alt={user.displayName}
        style={{
          borderRadius: "50%",
          height: smallNav ? "2.1rem" : "2.4rem",
          boxShadow: "0 0 10px " + APP_COLOR_EPIC_RED,
        }}
        title={user.displayName}
      />
      <GoSignOut
        onClick={handleSignOut}
        style={{
          fontSize: smallNav ? "1.9rem" : "2rem",
          cursor: "pointer",
          marginLeft: "5px",
          color: smallNav ? "white" : APP_COLOR_EPIC_RED,
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
