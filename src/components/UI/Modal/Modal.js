import React from "react";
import PropTypes from "prop-types";
//Components
import Backdrop from "../Backdrop/Backdrop";
//CSS Module
import classes from "./Modal.module.css";

const Modal = (props) => {
  let attachedClasses = [classes.modal, classes.modal__close];
  if (props.show) {
    attachedClasses = [classes.modal, classes.modal__open];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.close} />
      <div className={attachedClasses.join(" ")}>{props.children}</div>
    </React.Fragment>
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
};

export default Modal;
