import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './login';
import Register from './register';
import ForgotPass from './forgotPass';

export default class Main extends Component {
  render() {
    const { match } = this.props;
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path={[`${match.path}/login`, `${match.path}`]} component={Login} />
            <Route exact path={[`${match.path}/register`, `${match.path}`]} component={Register} />
            <Route exact path={[`${match.path}/ForgotPass`, `${match.path}`]} component={ForgotPass} />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}