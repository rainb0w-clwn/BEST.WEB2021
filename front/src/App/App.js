import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {Home} from '../Home';
import {Login} from '../Login';
import {Search} from '../Search';
import {Favorite} from '../Favorite';
import {User} from '../User';
import {PrivateRoute} from "../_components";

class App extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(alertActions.clear());
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <div className="app-container">
                <div id="content">
                        {/*{alert.message &&*/}
                        {/*<div className={`alert ${alert.type}`}>{alert.message}</div>*/}
                        {/*}*/}
                        <Router history={history}>
                            <div>
                                <Route exact path="/" component={Home}/>
                                <Route  path="/search" component={Search}/>
                                <PrivateRoute path="/favorite" component={Favorite}/>
                                <PrivateRoute path="/user" component={User}/>
                                <Route path="/login" component={Login}/>
                            </div>
                        </Router>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};
