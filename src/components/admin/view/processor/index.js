import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import List from "./list";

export default class Processor extends Component {
  render() {
    const { match } = this.props;
    return (
      <div id="layoutSidenav_content">
        <main>
          <Switch>
            <Route path={[`${match.path}/list`]} component={List} />
          </Switch>
        </main>
      </div>
    );
  }
}
