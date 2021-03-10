import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Secret from './Secret';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/secret">Secret</Link></li>
                    </ul>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/secret" component={Secret} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
