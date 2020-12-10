import React from "react";
import PropTypes from "prop-types";
//CSS MODULE
import classes from "./SquareButton.module.css";

const SquareButton = (props) => {
  let appliedClasses = [classes.btn];
  switch (props.btnType) {
    case "light":
      appliedClasses.push(classes.btn__light);
      break;
    case "primary":
      appliedClasses.push(classes.btn__primary);
      break;
    default:
      break;
  }

  return (
    <button
      style={{
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius,
        margin: props.margin,
        padding: props.padding,
      }}
      disabled={props.disabled}
      className={appliedClasses.join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

SquareButton.propTypes = {
  children: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  btnType: PropTypes.string,
  disabled: PropTypes.bool,
  clicked: PropTypes.func,
};

export default SquareButton;
