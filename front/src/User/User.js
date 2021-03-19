import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Container} from "react-bootstrap";
import { userActions } from '../_actions';
class User extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout(e) {
        this.props.dispatch(userActions.logout());
    }

    render() {
        const { user } = this.props;
        return (
            <Container>
                { user.login &&
                <div className="col-md-6 col-md-offset-3">
                    <h1>Привет {user.firstname != null ? user.firstname : user.login}!</h1>
                    <p>Эта страничка тебе не особа нужна, но ты можешь проверить, как все работает)</p>
                    <p>
                        <Link to="/login" onClick={this.handleLogout}>Выход</Link>
                    </p>
                </div>
                }
            </Container>

        );
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    const { user } = auth;
    return {
        user,
    };
}

const connectedUser = connect(mapStateToProps)(User);
export { connectedUser as User };
