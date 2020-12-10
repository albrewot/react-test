import React, { Component } from "react";
import PropTypes from "prop-types";
//Libraries
import { Redirect, Route, Switch } from "react-router-dom";
//Components
import Layout from "./containers/Layout/Layout";
import Simon from "./containers/Simon/Simon";
import Triangle from "./containers/Triangle/Triangle";

export class App extends Component {
  static propTypes = {};

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/triangle" component={Triangle} />
          <Route path="/simon" component={Simon} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default App;
