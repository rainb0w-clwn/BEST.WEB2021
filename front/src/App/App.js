import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';



import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {Header, PrivateRoute} from '../_components';
import {Home} from '../Home';
import {Login} from '../Login';

class App extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <div className="app-container">
                <Header/>
                <div id="content">
                    <div className="container">
                        <div className="col-sm-8 col-sm-offset-2">
                            {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            <Router history={history}>
                                <div>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/login" component={Login}/>
                                </div>
                            </Router>
                        </div>
                    </div>
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
