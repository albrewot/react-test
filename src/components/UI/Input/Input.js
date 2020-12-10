import React from "react";
import PropTypes from "prop-types";
//CSS MODULE
import classes from "./Input.module.css";

const Input = (props) => {
  let attachedClasses = [classes.input];
  if (props.shoudlValidate && props.invalid && props.touched) {
    attachedClasses.push(classes.input__invalid);
  }
  return (
    <div className={attachedClasses.join(" ")}>
      <label>{props.inputConfig.label}</label>
      <input
        {...props.inputConfig}
        value={props.value}
        onChange={(event) => props.changed(event, props.target, props.form)}
      />
      {props.error && <p className={classes.input__error}>{props.error}</p>}
    </div>
  );
};

Input.propTypes = {
  inputConfig: PropTypes.object,
  changed: PropTypes.func,
  value: PropTypes.string,
  invalid: PropTypes.bool,
  touched: PropTypes.bool,
  error: PropTypes.string,
  shoudlValidate: PropTypes.number,
};

export default Input;
