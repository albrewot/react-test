import React from "react";
import PropTypes from "prop-types";
//CSS Module
import classes from "./SimonBlock.module.css";

const SimonBlock = (props) => {
  let backgroundColor = { backgroundColor: props.offColor };
  if (props.turnedOn) {
    backgroundColor = { backgroundColor: props.onColor };
  }
  return <button className={classes.simon_block} style={backgroundColor} onClick={props.clicked}></button>;
};

SimonBlock.propTypes = {
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  turnedOn: PropTypes.bool,
  blockNumber: PropTypes.number,
  clicked: PropTypes.func,
};

export default SimonBlock;
