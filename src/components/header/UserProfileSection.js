import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../tools/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { userLogout } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import {
  APP_COLOR_EPIC_RED,
  USER_STOCK_IMG_WHITE_BKGRD,
} from "../../constants/constants";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  MdSpaceDashboard,
  MdAdminPanelSettings,
  MdLogout,
} from "react-icons/md";
import useWindhowWidth from "../../hooks/windowWidth";

function UserProfileSection({ user, userLogout }) {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const showMenuRef = useRef(null);
  const { isMobile } = useWindhowWidth();

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setShowMenu(false);
    }
  };

  const hideShowMenuOnDocumentClick = (event) => {
    if (!showMenuRef.current?.contains(event.target)) {
      setShowMenu(false);
    }
  };

  const toggleShowMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    document.addEventListener("mousedown", hideShowMenuOnDocumentClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", hideShowMenuOnDocumentClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  function handleSignOut() {
    userLogout(auth);
    history.push("/signin");
  }

  return (
    <section
      id="userSection"
      style={{
        boxShadow: `-4px 0 8px -6px gray`,
        cursor: "pointer",
        color: "white",
      }}
    >
      <img
        src={user.photoURL || USER_STOCK_IMG_WHITE_BKGRD}
        alt=""
        style={{
          borderRadius: "50%",
          height: isMobile ? "2.5rem" : "3.5rem",
          marginRight: "8px",
          border: "3px solid white",
        }}
        title={user.displayName}
      />
      <article>
        <p
          style={{
            fontSize: isMobile ? "8px" : "12px",
          }}
        >
          Epic Staff
        </p>
        {isMobile ? (
          <h6>{user.displayName.split(" ")[0]}</h6>
        ) : (
          <h5>{user.displayName}</h5>
        )}
      </article>
      {showMenu ? (
        <FaAngleUp className="userProfileMenuIcon" onClick={toggleShowMenu} />
      ) : (
        <FaAngleDown className="userProfileMenuIcon" onClick={toggleShowMenu} />
      )}
      {showMenu && (
        <div
          className="userProfileMenu"
          ref={showMenuRef}
          style={{ top: isMobile ? "4.5rem" : "6.5rem" }}
        >
          <ul style={{ listStyle: "none", padding: "0", margin: 0 }}>
            <li className="userMenuOptions">
              <MdSpaceDashboard
                style={{ marginRight: "10px", color: APP_COLOR_EPIC_RED }}
              />
              Dashboard
            </li>
            <li className="userMenuOptions">
              <RiLockPasswordFill
                style={{ marginRight: "10px", color: APP_COLOR_EPIC_RED }}
              />
              Security
            </li>
            <li className="userMenuOptions">
              <MdAdminPanelSettings
                style={{ marginRight: "10px", color: APP_COLOR_EPIC_RED }}
              />
              Admin Portal
            </li>
            <li
              className="userMenuOptions"
              style={{ cursor: "pointer", color: "black" }}
              onClick={handleSignOut}
            >
              <MdLogout
                style={{ marginRight: "10px", color: APP_COLOR_EPIC_RED }}
              />
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
const mapDispatchToProps = {
  userLogout,
};

export default connect(null, mapDispatchToProps)(UserProfileSection);
