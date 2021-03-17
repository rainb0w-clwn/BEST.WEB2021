import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import {ProductDeck} from '../ProductDeck';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    componentDidMount() {
        // this.props.dispatch(userActions.getAll());
    }

    handleLogout(e) {
        this.props.dispatch(userActions.logout());
    }

    render() {
        const { user, users } = this.props;
        return (
            <ProductDeck/>
            // <div className="col-md-6 col-md-offset-3">
            //     <h1>Hi {user.firstname != null ? user.firstname : user.login}!</h1>
            //     <p>You're logged in with React & JWT!!</p>
            //     {/*<h3>Users from secure api end point:</h3>*/}
            //     {/*{users.loading && <em>Loading users...</em>}*/}
            //     {/*{users.error && <span className="text-danger">ERROR: {users.error}</span>}*/}
            //     {/*{users.items &&*/}
            //     {/*<ul>*/}
            //     {/*    {users.items.map((user, index) =>*/}
            //     {/*        <li key={user.id}>*/}
            //     {/*            {user.firstname + ' ' + user.lastname}*/}
            //     {/*        </li>*/}
            //     {/*    )}*/}
            //     {/*</ul>*/}
            //     {/*}*/}
            //     <p>
            //         <Link to="/login" onClick={this.handleLogout} >Logout</Link>
            //     </p>
            // </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, auth } = state;
    const { user } = auth;
    return {
        user,
        users
    };
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };
