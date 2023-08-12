import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Edit from './edit';
import List from './list'
import orderTracking from './orderTracking'
export default class Order extends Component {
    render() {
        const { match } = this.props;
        console.log(match)
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={List} />
                        <Route path={[`${match.path}/orderTracking/:id`]} component={orderTracking} />
                        <Route path={[`${match.path}/edit/:id`]} component={Edit} />
                    </Switch>
                </main>
            </div>
        );
    }
}