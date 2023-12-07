import React, { useEffect, useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import Burger from "./Burger";
import { WindowWidthContext } from "../App";
import { APP_COLOR_EPIC_RED } from "../../constants";
import UserProfileSection from "./UserProfileSection";

const Header = ({ user }) => {
  const windowWidth = useContext(WindowWidthContext);
  const [open, setOpen] = useState(false);
  const activeStyle = { backgroundColor: "white", color: APP_COLOR_EPIC_RED };
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

  return windowWidth < 650 ? (
    <main className="smallNavContainer">
      <div id="smallNavTopHeader">
        <Burger open={open} setOpen={setOpen} />
        <UserProfileSection user={user} windowWidth={windowWidth} />
      </div>
      {open && (
        <nav className="navSmallContent" ref={navRef}>
          <NavLink
            to="/"
            activeStyle={activeStyle}
            exact
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/main"
            activeStyle={activeStyle}
            onClick={() => setOpen(false)}
          >
            Main
          </NavLink>
        </nav>
      )}
    </main>
  ) : (
    <main className="navContainer">
      <nav className="navFull">
        <NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
        <NavLink to="/main" activeStyle={activeStyle}>
          Main
        </NavLink>
      </nav>
      <UserProfileSection user={user} />
    </main>
  );
};

export default Header;
