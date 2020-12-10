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
import Input from "../../components/UI/Input/Input";
//helpers
import checkValidity from "../../helpers/validation";
import { scoreSubmit } from "../../services/SimonServices";

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
    correct: [],
    playerName: "",
    blocks: [
      { on: "#8b190f", off: "#FF4136", status: false },
      { on: "#cea10b", off: "#FFDC00", status: false },
      { on: "#0c0fbb", off: "#0074D9", status: false },
      { on: "#0c8116", off: "#2ECC40", status: false },
    ],
    scoreboard: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Name",
          placeholder: "Enter Your Name",
        },
        value: "",
        valid: false,
        touched: false,
        error: null,
        rules: {
          required: true,
          minLength: 2,
        },
      },
    },
    formIsValid: false,
  };

  startGame = () => {
    console.log("Started");
    let pattern = [...this.state.pattern];
    let blockNumber = Math.floor(Math.random() * 4);
    pattern.push(blockNumber);
    console.log("PATTERN", pattern);
    if (!this.state.gameStarted) {
      this.blinkColors(pattern);
      this.setState({
        pattern,
        playerTurn: true,
        gameStarted: true,
      });
    } else {
      this.blinkColors(pattern);
      this.setState({
        pattern,
        playerTurn: true,
      });
    }
  };

  blinkBlock = (block) => {
    const blocks = [...this.state.blocks];
    return new Promise((resolve, reject) => {
      blocks[block] = updateObject(blocks[block], { status: true });
      this.setState({ blocks });
      setTimeout(() => {
        blocks[block] = updateObject(blocks[block], { status: false });
        this.setState({ blocks });
        setTimeout(() => {
          resolve();
        }, 250);
      }, 1000);
    });
  };

  blinkColors = async (pattern) => {
    try {
      for (let block of pattern) {
        await this.blinkBlock(block);
      }
    } catch (e) {
      console.log(e);
    }
  };

  gameOver = () => {
    this.setState({
      gameOver: true,
    });
  };

  closeGameOver = () => {
    this.resetGame();
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
      playerTurn: false,
      playerPattern: [],
      correct: [],
      playerName: "",
      blocks: newBlocks,
    });
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
        disabled={!this.state.playerTurn}
      />
    ));
  };

  checkValue = (playerPattern, pos) => {
    console.log("POSItION", playerPattern, pos);
    const gamePattern = [...this.state.pattern];
    if (gamePattern[pos] === playerPattern[pos]) {
      return true;
    }
    return false;
  };

  checkPlayerPattern = (playerCorrect, playerPattern) => {
    const gamePattern = [...this.state.pattern];
    const correct = [...this.state.correct];
    if (playerCorrect) {
      correct.push(playerCorrect);
      this.setState({ correct, playerPattern });
      if (gamePattern.length === correct.length && correct.every((value) => value === true)) {
        this.setState({ correct: [], playerPattern: [], round: this.state.round + 1 });
        setTimeout(() => {
          this.startGame();
        }, 1000);
      }
    } else if (!playerCorrect) {
      this.setState({
        gameOver: true,
      });
    }
    return;
  };

  handlePlayerTurn = (blockNumber) => {
    const playerTurnPattern = [...this.state.playerPattern];
    let lastPos = playerTurnPattern.length - 1;
    if (this.state.playerTurn) {
      playerTurnPattern.push(blockNumber);
      lastPos = lastPos + 1;
      let correct = this.checkValue(playerTurnPattern, lastPos);
      console.log("isCorrect", correct);
      this.checkPlayerPattern(correct, playerTurnPattern);
    }
  };

  handleInputChange = (event, target, form) => {
    const updatedInput = updateObject(this.state[form][target], { value: event.target.value });
    const validity = checkValidity(updatedInput.value, updatedInput.rules);
    updatedInput.valid = validity.isValid;
    updatedInput.error = validity.error;
    updatedInput.touched = true;
    const updatedForm = updateObject(this.state[form], { [target]: updatedInput });

    let formIsValid = true;
    for (let inputElement in updatedForm) {
      formIsValid = updatedForm[inputElement].valid && formIsValid;
    }

    console.log("formIsValid", formIsValid, updatedForm);

    this.setState({ [form]: updatedForm, formIsValid });
  };

  handleSubmitScore = (event) => {
    event.preventDefault();
    const scoreData = {};
    for (let key in this.state.scoreboard) {
      scoreData[key] = this.state.scoreboard[key].value;
    }
    scoreData["score"] = this.state.round;
    const response = scoreSubmit(scoreData);
    if (response) {
      this.closeGameOver();
    }
    console.log(response);
  };

  renderFormInputs = (form) => {
    let formElements = [];
    for (let key in this.state[form]) {
      formElements.push({
        id: key,
        config: this.state[form][key],
      });
    }
    return formElements.map((element) => {
      switch (element.config.elementType) {
        case "input":
          return (
            <Input
              key={element.id}
              inputConfig={element.config.elementConfig}
              value={element.config.value}
              invalid={!element.config.valid}
              touched={element.config.touched}
              error={element.config.error}
              shoudlValidate={Object.keys(element.config.rules).length}
              changed={(event) => this.handleInputChange(event, element.id, form)}
            />
          );
        default:
          return null;
      }
    });
  };

  render() {
    return (
      <div className={classes.simon}>
        <h1>SIMON SAYS</h1>
        <Modal show={this.state.gameOver} close={this.closeGameOver}>
          <div>
            <div className={classes.simon__modal__upper}>
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
            </div>
            <form className={classes.simon__modal__bottom}>
              <h3>Submit your Score!</h3>
              {this.renderFormInputs("scoreboard")}
              <SquareButton
                width="100%"
                borderRadius="5px"
                margin="20px 0 20px 0"
                padding="10px"
                width="100%"
                btnType="primary"
                clicked={this.handleSubmitScore}
                disabled={!this.state.formIsValid}
              >
                SUBMIT SCORE
              </SquareButton>
            </form>
          </div>
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
        <SquareButton
          width="100%"
          borderRadius="5px"
          margin="20px 0 20px 0"
          padding="10px"
          width="80px"
          btnType="light"
          clicked={this.resetGame}
          disabled={!this.state.gameStarted}
        >
          RESET
        </SquareButton>
        <SimonScore score={this.state.round} />
        <div className={classes.simon__buttons}>{this.renderBlocks(this.state.blocks)}</div>
      </div>
    );
  }
}
