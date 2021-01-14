import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"


import OverviewList from "./list"
import MessageIdDetail from "./messageIdDetail"
import HeightDetail from "./heightDetail"

export default class MinerOverview extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/minerOverview" component={OverviewList} />
                    <Route path="/minerOverview/messageIdDetail" component={MessageIdDetail} />
                    <Route path="/minerOverview/heightDetail" component={HeightDetail} />
                </Switch>
            </div>
        )
    }
}