import React, { Component } from "react";
// import PropTypes from 'prop-types'
//CSS Module
import classes from "./Triangle.module.css";
//Helpers
import updateObject from "../../helpers/updateObject";
import checkValidity from "../../helpers/validation";
//Components
import Input from "../../components/UI/Input/Input";
import SquareButton from "../../components/UI/Buttons/SquareButton/SquareButton";

export default class Triangle extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  state = {
    sideA: null,
    sideB: null,
    hypothenuse: null,
    Perimeter: 1000,
    formIsValid: false,
    inputs: {
      sideA: {
        elementType: "input",
        elementConfig: {
          type: "number",
          label: "Side A",
          placeholder: "Enter Side A",
        },
        value: "",
      },
      sideB: {
        elementType: "input",
        elementConfig: {
          type: "number",
          label: "Side A",
          placeholder: "Enter Side A",
        },
        value: "",
      },
    },
  };

  componentDidMount = () => {
    this.findMissingSides();
    this.pitagoras();
  };

  pitagoras = () => {
    let a = this.state.sideA;
    let b = this.state.sideB;
    let firstMember = Math.pow(a, 2) + Math.pow(b, 2);
    let secondMember = Math.sqrt(firstMember);
    console.log(firstMember === secondMember);
    return firstMember === secondMember;
  };

  findSide = (side) => {
    let P = this.state.Perimeter;
    let top = Math.pow(P, 2) - 2 * side * P;
    let down = 2 * P - 2 * side;
    let result = top / down;
    return result;
  };

  findHypothenuse = () => {
    let a = this.state.sideA;
    let b = this.state.sideB;
    let P = this.state.Perimeter;
    console.log(a, b, P);
    let h = P - a - b;
    this.setState({ hypothenuse: h });
  };

  findMissingSides = () => {
    //given at least 2 side with Perimeter being 1000
    let a = this.state.inputs.sideA.value;
    let b = this.state.inputs.sideB.value;
    if (a > 0 || b > 0) {
      let result = null;
      if (a > 0) {
        result = this.findSide(a);
        console.log(result);
        this.setState({ sideB: result }, () => this.findHypothenuse());
      } else if (b > 0) {
        result = this.findSide(b);
        console.log(result);
        this.setState({ sideA: result }, () => this.findHypothenuse());
      }
      return result;
    } else {
      console.log("must provide at least 2 side");
    }
  };

  handleInputChange = (event, target, form) => {
    const updatedInput = updateObject(this.state[form][target], { value: event.target.value });
    const updatedForm = updateObject(this.state[form], { [target]: updatedInput });

    this.setState({ [form]: updatedForm, [target]: event.target.value });
  };

  renderInputs = (form) => {
    let elements = [];
    for (let key in this.state[form]) {
      elements.push({
        id: key,
        config: this.state[form][key],
      });
    }
    return elements.map((element) => {
      switch (element.config.elementType) {
        case "input":
          return (
            <Input
              key={element.id}
              inputConfig={element.config.elementConfig}
              value={element.config.value}
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
      <React.Fragment>
        <div className={classes.triangle__container}>
          <div className={classes.triangle__numbers}>
            <h1>A : {this.state.sideA}</h1>
            <h1>B : {this.state.sideB}</h1>
            <h1>C : {this.state.hypothenuse}</h1>
            <h1>Perimeter: {this.state.Perimeter}</h1>
          </div>
          <div className={classes.triangle__inputs}>
            {this.renderInputs("inputs")}
            <SquareButton
              width="100%"
              borderRadius="5px"
              margin="20px 0 20px 0"
              padding="10px"
              width="100%"
              btnType="primary"
              clicked={() => this.findMissingSides()}
            >
              CALCULATE
            </SquareButton>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
