import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import List from "./list";
import AttributeValue from "./attributeValue";

export default class Attribute extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        {/* <Route path={[`${match.path}/`]} component={List} /> */}
                        <Route exact path="/admin/Attribute/attributeValue/:id" component={AttributeValue} />
                        <Route path={[`${match.path}/list`]} component={List} />
                    </Switch>
                </main>
            </div>
        );
    }
}
