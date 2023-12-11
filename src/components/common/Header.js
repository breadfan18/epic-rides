import React, { useEffect, useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import Burger from "./Burger";
import { WindowWidthContext } from "../App";
import { APP_COLOR_EPIC_RED } from "../../constants";
import UserProfileSection from "./UserProfileSection";

const Header = ({ user }) => {
  const windowWidth = useContext(WindowWidthContext);
  const [open, setOpen] = useState(false);
  const activeStyle = { backgroundColor: APP_COLOR_EPIC_RED, color: "white" };
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

  return windowWidth < 650 ? (
    <main className="smallNavContainer">
      <div id="smallNavTopHeader">
        <Burger open={open} setOpen={setOpen} />
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
            to="/tours"
            activeStyle={activeStyleSmall}
            onClick={() => setOpen(false)}
          >
            Tours
          </NavLink>
          <NavLink
            to="/explanations"
            activeStyle={activeStyleSmall}
            onClick={() => setOpen(false)}
          >
            Explanations
          </NavLink>
          <NavLink
            to="/lists"
            activeStyle={activeStyleSmall}
            onClick={() => setOpen(false)}
          >
            Lists
          </NavLink>
          <NavLink
            to="/agents"
            activeStyle={activeStyleSmall}
            onClick={() => setOpen(false)}
          >
            Agents
          </NavLink>
        </nav>
      )}
    </main>
  ) : (
    <main className="navContainer">
      <img
        src="https://i.imgur.com/M0W3075.png"
        alt=""
        style={{ height: "5rem" }}
      />
      <nav className="navFull">
        <NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
        <NavLink to="/tours" activeStyle={activeStyle}>
          Tours
        </NavLink>
        <NavLink to="/explanations" activeStyle={activeStyle}>
          Explanations
        </NavLink>
        <NavLink to="/lists" activeStyle={activeStyle}>
          Lists
        </NavLink>
        <NavLink to="/agents" activeStyle={activeStyle}>
          Agents
        </NavLink>
      </nav>
      <UserProfileSection user={user} />
    </main>
  );
};

export default Header;
