import React from 'react';
import { connect } from 'react-redux';
import {Header, ProductDeck} from '../_components';
import {Home} from "../Home";

class Search extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.handleLogout = this.handleLogout.bind(this);
    // }
    // componentDidMount() {
    //     // this.props.dispatch(userActions.getAll());
    // }
    //
    // handleLogout(e) {
    //     this.props.dispatch(userActions.logout());
    // }

    render() {
        // const { user, users } = this.props;
        return (
            <React.Fragment>
                <Header/>
                <ProductDeck/>
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
    return {};
}

const connectedSearch = connect(mapStateToProps)(Search);
export { connectedSearch as Search };
