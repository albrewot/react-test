import React from "react";
import PropTypes from "prop-types";
//CSS MODULE
import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  return props.show ? <div className={classes.backdrop} onClick={props.clicked}></div> : null;
};

Backdrop.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func,
};

export default Backdrop;
