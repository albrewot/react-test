import React from "react";
import PropTypes from "prop-types";
//CSS Module
import classes from "./SimonBlock.module.css";

const SimonBlock = (props) => {
  let attachedClasses = [classes.simon_block];
  let backgroundColor = { backgroundColor: props.offColor };
  if (props.turnedOn) {
    attachedClasses.push(classes.simon_block__active);
    backgroundColor = { backgroundColor: props.onColor };
  }
  return (
    <button
      className={attachedClasses.join(" ")}
      style={backgroundColor}
      onClick={props.clicked}
      disabled={props.disabled}
    ></button>
  );
};

SimonBlock.propTypes = {
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  turnedOn: PropTypes.bool,
  blockNumber: PropTypes.number,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SimonBlock;
