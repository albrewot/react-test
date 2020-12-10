import React from "react";
import PropTypes from "prop-types";
//CSS Module
import classes from "./NavList.module.css";
//Components
import NavItem from "../NavItem/NavItem";

const NavList = (props) => {
  let renderItems = (
    <React.Fragment>
      <NavItem link="/">Home</NavItem>
      <NavItem link="/triangle">Triangle</NavItem>
      <NavItem link="/simon">Simon</NavItem>
      <NavItem link="/scoreboard">Scoreboard</NavItem>
    </React.Fragment>
  );

  return <ul className={classes.nav_list}>{renderItems}</ul>;
};

NavList.propTypes = {};

export default NavList;
