import React from 'react';
import { connect } from 'react-redux';
import {Header, ProductDeck} from '../_components';
import {Home} from "../Home";
import {Container} from "react-bootstrap";

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
        const { products, } = this.props;
        return (
            <React.Fragment>
                <Header/>
                <ProductDeck/>
                <Container fluid>
                    {!products.loading && !products.search_started &&
                    <div className="home-image-wrapper">
                        <img src="public/home_placeholder.png"/>
                    </div>
                    }
                </Container>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { products } = state;
    return {
        products,
    };
}

const connectedSearch = connect(mapStateToProps)(Search);
export { connectedSearch as Search };
