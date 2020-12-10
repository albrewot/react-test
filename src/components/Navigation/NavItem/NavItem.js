import React from "react";
import PropTypes from "prop-types";
//CSS Module
import classes from "./NavItem.module.css";
//Libraries
import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <li className={classes.nav_item}>
      <NavLink to={props.link} exact activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  link: PropTypes.string,
};

export default NavItem;
