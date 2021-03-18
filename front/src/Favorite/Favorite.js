import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import {Header,ProductDeck} from '../_components';

class Favorite extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.handleLogout = this.handleLogout.bind(this);
    // }
    // componentDidMount() {
    //     // this.props.dispatch(userActions.getAll());
    // }

    // handleLogout(e) {
    //     this.props.dispatch(userActions.logout());
    // }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <ProductDeck favorite={true}/>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    // const { users, auth } = state;
    // const { user } = auth;
    // return {
    //     user,
    //     users
    // };
    return {}
}

const connectedFavorite = connect(mapStateToProps)(Favorite);
export { connectedFavorite as Favorite };
