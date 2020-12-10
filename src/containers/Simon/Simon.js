import React, { Component } from "react";
// import PropTypes from "prop-types";
//CSS Module
import classes from "./Simon.module.css";
//Components
import SimonBlock from "../../components/UI/SimonBlock/SimonBlock";
import SimonScore from "../../components/UI/SimonScore/SimonScore";
import updateObject from "../../helpers/updateObject";
import Modal from "../../components/UI/Modal/Modal";
import SquareButton from "../../components/UI/Buttons/SquareButton/SquareButton";

export default class Simon extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };
  state = {
    gameStarted: false,
    gameOver: false,
    round: 0,
    pattern: [],
    playerTurn: false,
    playerPattern: [],
    playerName: "",
    blocks: [
      { on: "lightred", off: "darkred", status: false },
      { on: "lightgoldenrodyellow", off: "darkgoldenrod", status: false },
      { on: "lightblue", off: "darkblue", status: false },
      { on: "lightgreen", off: "darkgreen", status: false },
    ],
  };

  startGame = () => {
    console.log("Started");
    let pattern = [...this.state.pattern];
    console.log("Old Pattern", pattern);
    let blockNumber = Math.floor(Math.random() * 4);
    pattern.push(blockNumber);
    if (!this.state.gameStarted) {
      this.setState({
        pattern,
        playerTurn: true,
        gameStarted: true,
      });
    } else {
      // this.turnOnColors(pattern);
      this.setState({
        pattern,
        playerTurn: true,
      });
    }
  };

  turnOnColors = (pattern) => {
    let blocks = [...this.state.blocks];
    pattern.map((number) => {
      return setInterval(() => {
        let newColor = updateObject(blocks[number], { status: true });
        blocks[number] = newColor;
        this.setState({ blocks });
      }, 1500);
    });
  };

  gameOver = () => {
    this.setState({
      gameOver: true,
    });
  };

  resetGame = () => {
    let oldBlocks = [...this.state.blocks];
    let newBlocks = [];
    for (let block in oldBlocks) {
      let resetBlock = updateObject(oldBlocks[block], { status: false });
      newBlocks.push(resetBlock);
    }

    this.setState({
      gameStarted: false,
      gameOver: false,
      round: 0,
      pattern: [],
      playerPattern: [],
      playerTurn: false,
      playerName: "",
      blocks: newBlocks,
    });
  };

  checkPatterns = (playerPattern) => {
    let pattern1 = [...this.state.pattern];
    let pattern2 = [...playerPattern];
    return (
      Array.isArray(pattern1) &&
      Array.isArray(pattern2) &&
      pattern1.length === pattern2.length &&
      pattern1.every((value, index) => value === pattern2[index])
    );
  };

  renderBlocks = (blocks) => {
    return blocks.map((color, index) => (
      <SimonBlock
        key={index}
        onColor={color.on}
        offColor={color.off}
        blockNumber={index}
        clicked={() => this.handlePlayerTurn(index)}
        turnedOn={color.status}
      />
    ));
  };

  handlePlayerTurn = (blockNumber) => {
    console.log("Player Turn", blockNumber);
    let playerTurnPattern = [...this.state.playerPattern];
    if (this.state.playerTurn) {
      playerTurnPattern.push(blockNumber);
      console.log(playerTurnPattern);
      let correct = this.checkPatterns(playerTurnPattern);
      console.log(this.checkPatterns(playerTurnPattern));
      if (correct) {
        this.setState({ playerPattern: playerTurnPattern, playerTurn: false, round: this.state.round + 1 });
        this.startGame();
      } else {
        this.gameOver();
        setTimeout(() => {
          this.resetGame();
        }, 5000);
      }
    }
  };

  render() {
    return (
      <div className={classes.simon}>
        <h1>SIMON SAYS</h1>
        <Modal show={this.state.gameOver} close={this.closeGameOver}>
          <SimonScore score={this.state.round} />
          <SquareButton
            width="100%"
            borderRadius="5px"
            margin="20px 0 20px 0"
            padding="10px"
            width="80px"
            btnType="primary"
            clicked={this.resetGame}
          >
            TRY AGAIN
          </SquareButton>
        </Modal>
        <SquareButton
          width="100%"
          borderRadius="5px"
          margin="20px 0 20px 0"
          padding="10px"
          width="80px"
          btnType="primary"
          clicked={this.startGame}
          disabled={this.state.gameStarted}
        >
          START GAME
        </SquareButton>
        <SimonScore score={this.state.round} />
        <div className={classes.simon__buttons}>{this.renderBlocks(this.state.blocks)}</div>
      </div>
    );
  }
}
