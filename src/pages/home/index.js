import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"


import HomeList from "./list"
import HomeSearch from "./search"

export default class Home extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/home" component={HomeList} />
                    <Route path="/home/homeSearch/:cid?" component={HomeSearch} />
                </Switch>
            </div>
        )
    }
}