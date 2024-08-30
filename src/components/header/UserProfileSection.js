import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../tools/firebase";
import { GoSignOut } from "react-icons/go";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { userLogout } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import {
  APP_COLOR_EPIC_RED,
  USER_STOCK_IMG_WHITE_BKGRD,
} from "../../constants/constants";

function UserProfileSection({ user, userLogout, smallNav }) {
  const history = useHistory();
  const [showUserOptions, setShowUserOptions] = useState(false);
  const userOptionsRef = useRef(null);

  function handleSignOut() {
    userLogout(auth);
    history.push("/signin");
  }

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setShowUserOptions(false);
    }
  };

  const hideUserOptionsOnDocumentClick = (event) => {
    if (!userOptionsRef.current?.contains(event.target)) {
      setShowUserOptions(false);
    }
  };

  const toggleUserOptions = () => setShowUserOptions(!showUserOptions);

  useEffect(() => {
    document.addEventListener("mousedown", hideUserOptionsOnDocumentClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", hideUserOptionsOnDocumentClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <section id="userImg" style={{ marginRight: smallNav ? null : "10px" }}>
      <img
        src={user.photoURL || USER_STOCK_IMG_WHITE_BKGRD}
        alt={user.displayName}
        style={{
          borderRadius: "50%",
          height: smallNav ? "2.1rem" : "4rem",
          boxShadow: "0 0 10px " + APP_COLOR_EPIC_RED,
          border: "3px solid white",
          cursor: "pointer",
        }}
        title={user.displayName}
        onClick={toggleUserOptions}
      />
      {showUserOptions && (
        <section className="userOptionsSet" ref={userOptionsRef}>
          <ul>
            <li className="userOption" onClick={handleSignOut}>
              <p style={{ color: APP_COLOR_EPIC_RED }}>Sign Out</p>
              <GoSignOut
                style={{
                  fontSize: smallNav ? "1.9rem" : "1.4rem",
                  cursor: "pointer",
                  marginLeft: "5px",
                  color: APP_COLOR_EPIC_RED,
                }}
                title="Sign Out"
              />
            </li>
          </ul>
        </section>
      )}
    </section>
  );
}

const mapDispatchToProps = {
  userLogout,
};

export default connect(null, mapDispatchToProps)(UserProfileSection);
