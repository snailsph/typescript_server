import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from '../pages/login';
import Home from '../pages/home';

export default class CRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={home}> </Route>
                <Route path="/login" component={login}> </Route>
            </Switch>
        )
    }
}