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
    render() {
        const { loading, } = this.props;
        return (
            <div>
                <Header/>
                    <Container fluid>
                        {!loading &&
                        <div className="home-image-wrapper">
                            <img src="public/home_placeholder.png"/>
                        </div>
                        }
                    </Container>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { products } = state;
    const { loading } = products;
    return {
        loading,
    };
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };
