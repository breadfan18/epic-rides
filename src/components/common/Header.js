import React, { useEffect, useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import Burger from "./Burger";
import { WindowWidthContext } from "../App";
import { APP_COLOR_EPIC_RED, EPIC_LOGO } from "../../constants/constants";
import UserProfileSection from "./UserProfileSection";

const Header = ({ user }) => {
  const windowWidth = useContext(WindowWidthContext);
  const [open, setOpen] = useState(false);
  const activeStyle = { backgroundColor: "white", color: APP_COLOR_EPIC_RED };
  const activeStyleSmall = {
    backgroundColor: "white",
    color: APP_COLOR_EPIC_RED,
  };
  let navRef = useRef();
  useEffect(() => {
    const navMenuHandler = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", navMenuHandler);

    return () => document.removeEventListener("mousedown", navMenuHandler);
  });

  return windowWidth < 690 ? (
    <main className="smallNavContainer">
      <div id="smallNavTopHeader">
        <Burger open={open} setOpen={setOpen} />
        <img
          src={EPIC_LOGO}
          alt=""
          style={{
            height: "3rem",
            filter: "invert(100%) brightness(1000%)"
          }}
        />
        <UserProfileSection user={user} windowWidth={windowWidth} smallNav />
      </div>
      {open && (
        <nav className="navSmallContent" ref={navRef}>
          <NavLink
            to="/"
            activeStyle={activeStyleSmall}
            exact
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/agents"
            activeStyle={activeStyleSmall}
            onClick={() => setOpen(false)}
          >
            Agents
          </NavLink>
          <NavLink
            to="/tours"
            activeStyle={activeStyleSmall}
            onClick={() => setOpen(false)}
          >
            Tours
          </NavLink>
        </nav>
      )}
    </main>
  ) : (
    <main className="navContainer">
      <img src={EPIC_LOGO} alt="" style={{ height: "5rem", filter: "invert(100%) brightness(1000%)" }} />
      <nav className="navFull">
        <NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
        <NavLink to="/agents" activeStyle={activeStyle}>
          Agents
        </NavLink>
        <NavLink
          to="/tours"
          activeStyle={activeStyle}
        >
          Tours
        </NavLink>
      </nav>
      <UserProfileSection user={user} />
    </main>
  );
};

export default Header;
