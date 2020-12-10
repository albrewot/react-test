import React from "react";
import PropTypes from "prop-types";
//CSS Module
import classes from "./SimonScore.module.css";

const SimonScore = (props) => {
  return (
    <h1 className={classes.simon_score}>
      Score: <strong>{props.score}</strong>
    </h1>
  );
};

SimonScore.propTypes = {
  score: PropTypes.number,
};

export default SimonScore;
