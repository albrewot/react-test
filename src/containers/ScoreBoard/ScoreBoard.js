import React, { Component } from "react";
import SquareButton from "../../components/UI/Buttons/SquareButton/SquareButton";
import sortObject from "../../helpers/sortObject";
import { getScores } from "../../services/SimonServices";
//CSS MODULE
import classes from "./ScoreBoard.module.css";

export default class ScoreBoard extends Component {
  state = {
    scores: [],
  };

  componentDidMount() {
    this.retrieveScores();
  }

  retrieveScores = async () => {
    const response = await getScores();
    if (response) {
      let parsedObject = [];
      for (let object in response.data) {
        parsedObject.push(response.data[object]);
      }
      console.log(parsedObject);
      let sortedScores = parsedObject.sort((a, b) => b.score - a.score);
      this.setState({ scores: sortedScores });
    }
  };

  playSimon = () => {
    this.props.history.push("/simon");
  };

  render() {
    return (
      <div className={classes.score__container}>
        <SquareButton
          width="100%"
          borderRadius="5px"
          margin="20px 0 20px 0"
          padding="10px"
          width="250px"
          btnType="primary"
          clicked={this.playSimon}
          // disabled={}
        >
          PLAY SIMON SAYS
        </SquareButton>
        <h2>HIGH SCORES</h2>
        <div className={classes.score__board}>
          <div className={classes.score__board_header}>
            <p>NAME</p>
            <p>SCORE</p>
          </div>
          <div className={classes.score__board_scores}>
            {this.state.scores.map((score, i) => {
              return (
                <div className={classes.score__scores}>
                  <p className={classes.score__item}>{score.name}</p>
                  <p className={classes.score__item}>{score.score}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
