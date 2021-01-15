import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"


import OverviewList from "./list"
import MessageIdDetail from "./messageIdDetail"
import HeightDetail from "./heightDetail"
import SenderDetail from "./senderDetail"
import BlockDetail from "./blockDetail"
import NodeIdDetail from "./nedeIdDetail";

export default class MinerOverview extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/minerOverview" component={OverviewList} />
                    <Route path="/minerOverview/messageIdDetail" component={MessageIdDetail} />
                    <Route path="/minerOverview/heightDetail" component={HeightDetail} />
                    <Route path="/minerOverview/senderDetail" component={SenderDetail} />
                    <Route path="/minerOverview/blockDetail" component={BlockDetail} />
                    <Route path="/minerOverview/nodeIdDetail" component={NodeIdDetail} />
                </Switch>
            </div>
        )
    }
}