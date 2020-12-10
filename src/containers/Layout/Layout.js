import React, { Component } from "react";
// import PropTypes from 'prop-types'
//CSS Module
import classes from "./Layout.module.css";
//Components
import NavBar from "../../components/Navigation/NavBar/NavBar";

export default class Layout extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className={classes.main}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}
