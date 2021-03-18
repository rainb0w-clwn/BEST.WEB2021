import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Container} from "react-bootstrap";
import { userActions } from '../_actions';
import {Header, ProductDeck, ProductFilter} from '../_components';
class Home extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.handleLogout = this.handleLogout.bind(this);
    // }
    // componentDidMount() {
    //     // this.props.dispatch(userActions.getAll());
    // }

    // handleLogout(e) {
    //     this.props.dispatch(userActions.logout());
    // }

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <Header/>
                    <Container fluid>
                        <div className="home-image-wrapper">
                            <img src="public/home_placeholder.png"/>
                        </div>
                    </Container>

            </div>
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

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };
