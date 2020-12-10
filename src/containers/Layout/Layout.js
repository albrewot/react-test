import React, { Component } from "react";
// import PropTypes from 'prop-types'
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
        <main>{this.props.children}</main>
      </React.Fragment>
    );
  }
}
