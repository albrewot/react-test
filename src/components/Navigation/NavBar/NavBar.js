import React from "react";
import PropTypes from "prop-types";
//CSS Module
import classes from "./NavBar.module.css";
//Components
import NavList from "../NavList/NavList";

const NavBar = (props) => {
  return (
    <header className={classes.nav_bar}>
      <nav>
        <NavList />
      </nav>
    </header>
  );
};

NavBar.propTypes = {};

export default NavBar;
