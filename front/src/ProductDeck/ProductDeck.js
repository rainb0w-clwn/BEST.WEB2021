import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Container} from "react-bootstrap";
import {productActions} from '../_actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import StarRatings from 'react-star-ratings';

class ProductDeck extends React.Component {
    constructor(props) {
        super(props);
        // this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            query: {name: 'телефон', limit: '5'},
        };
    }

    componentDidMount() {
        this.props.dispatch(productActions.getProducts({name: 'телефон', limit: '5'}));
    }

    // handleLogout(e) {
    //     this.props.dispatch(userActions.logout());
    // }

    render() {
        const {user, products} = this.props;
        return (
            <main>
                <Container fluid className="mt-4">
                    {products.loading && <em>Loading products...</em>}
                    {products.products_data &&
                    <div className="product-deck">
                        {products.products_data.map((product, index) =>
                                <div className="product-card h-100">
                                    <div className="product-header">
                                        <img src={product.url_picture}/>
                                    </div>
                                    <div className="card-body product-info">
                                        <div className="product-vendor">
                                            {product.store_type}
                                        </div>
                                        <div className="product-title">
                                            <div className="product-name font-weight-bold">
                                                {product.name}
                                            </div>
                                            <div className="product-favorite">
                                                <FontAwesomeIcon icon={faHeart} size="2x"/>
                                            </div>
                                        </div>
                                        <div className="product-info-sub">
                                            <div className="product-price">
                                                {product.price} ₽
                                            </div>
                                            <div className="product-rating">
                                                <StarRatings
                                                    rating={product.rating ? product.rating: 0}
                                                    starRatedColor="red"
                                                    // changeRating={this.changeRating}/
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension='15px'
                                                    starSpacing='4px'
                                                />
                                                <span className="product-rating-count ml-1">
                                                    ({product.rating_count})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )}
                    </div>
                    }
                </Container>
                {user.login &&
                <div className="col-md-6 col-md-offset-3">

                    <h1>Hi {user.firstname != null ? user.firstname : user.login}!</h1>
                    <p>You're logged in with React & JWT!!</p>
                    {/*<h3>Users from secure api end point:</h3>*/}
                    {/*{users.loading && <em>Loading users...</em>}*/}
                    {/*{users.error && <span className="text-danger">ERROR: {users.error}</span>}*/}
                    {/*{users.items &&*/}
                    {/*<ul>*/}
                    {/*    {users.items.map((user, index) =>*/}
                    {/*        <li key={user.id}>*/}
                    {/*            {user.firstname + ' ' + user.lastname}*/}
                    {/*        </li>*/}
                    {/*    )}*/}
                    {/*</ul>*/}
                    {/*}*/}
                    <p>
                        <Link to="/login" onClick={this.handleLogout}>Logout</Link>
                    </p>
                </div>
                }
            </main>
        );
    }
}

function mapStateToProps(state) {
    const {auth, products} = state;
    const {user} = auth;
    return {
        user,
        products
    };
}

const connectedProductDeck = connect(mapStateToProps)(ProductDeck);
export {
    connectedProductDeck as ProductDeck
}
    ;