import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import List from "./list";
import Edit from "./edit";

export default class Bannerlist extends Component {
  render() {
    const { match } = this.props;
    return (
      <div id="layoutSidenav_content">
        <main>
          <Switch>
            <Route path={[`${match.path}/`]} component={List} />
            <Route path={[`${match.path}/edit`]} component={Edit} />
          </Switch>
        </main>
      </div>
    );  }
}
