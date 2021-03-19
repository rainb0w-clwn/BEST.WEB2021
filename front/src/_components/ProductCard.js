import React, {useEffect, useState} from 'react';
import {productActions} from '../_actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as fasHeart} from "@fortawesome/free-solid-svg-icons";
import StarRatings from 'react-star-ratings';
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";


export const ProductCard = (props) => {
    // const [loading, setLoading] = useState(true)
    const product = props.product;
    const search_type = useSelector(state => state.products.search_type)

    const [isFavorite, setIsFavorite] = useState(props.favorite)
    const history = useHistory();
    const dispatch = useDispatch()
    useEffect(() => {

    }, [isFavorite])
    const loggedIn = useSelector(state => state.auth.loggedIn)
    function handleAddFavorite(e) {
        e.stopPropagation();
        e.preventDefault();

        if (loggedIn == null || !loggedIn) {
            history.push('/login');
            return;
        }
        const id = search_type === 'search' ? product.id : product.Product.id;
        if (id) {
            dispatch(productActions.setFavorite(id));
            setIsFavorite(true);
        }
    }
    function handleDeleteFavorite(e) {
        e.stopPropagation();
        e.preventDefault();

        if (loggedIn == null || !loggedIn) {
            history.push('/login');
            return;
        }
        const id = search_type === 'search' ? product.id : product.Product.id;
        if (id) {
            dispatch(productActions.deleteFavorite(id));
            setIsFavorite(false);
        }
    }
    return (
        <React.Fragment>
            {search_type === 'search' &&
            <a className="product-card h-100" href={product.url} target="_blank">
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
                        {!isFavorite &&
                        <div className="product-favorite" data-id={product.id} onClick={handleAddFavorite}>
                            <FontAwesomeIcon icon={faHeart} className="product-favorite-icon" color="black" size="2x"/>
                        </div>
                        }
                        {isFavorite &&
                        <div className="product-favorite" data-id={product.id} onClick={handleDeleteFavorite}>
                            <FontAwesomeIcon icon={fasHeart} size="2x" className="favorite-icon" color="red"/>
                        </div>
                        }
                    </div>
                    <div className="product-info-sub">
                        <div className="product-price">
                            {product.price} ₽
                        </div>
                        <div className="product-rating">
                            <StarRatings
                                rating={product.rating ? product.rating : 0}
                                starRatedColor="red"
                                numberOfStars={5}
                                name='rating'
                                starDimension='15px'
                                starSpacing='4px'
                            />
                            <span className="product-rating-count ml-1">({product.rating_count})</span>
                        </div>
                    </div>
                </div>
            </a>
            }
            {search_type === 'favorite' &&
            <a className="product-card h-100" href={product.Product.url} target="_blank">
                <div className="product-header">
                    <img src={product.Product.url_picture}/>
                </div>
                <div className="card-body product-info">
                    <div className="product-vendor">
                        {product.Product.store_type}
                    </div>
                    <div className="product-title">
                        <div className="product-name font-weight-bold">
                            {product.Product.name}
                        </div>
                        {!isFavorite &&
                        <div className="product-favorite" data-id={product.id} onClick={handleAddFavorite}>
                            <FontAwesomeIcon icon={faHeart} className="product-favorite-icon" color="black" size="2x"/>
                        </div>
                        }
                        {isFavorite &&
                        <div className="product-favorite" data-id={product.Product.id} onClick={handleDeleteFavorite}>
                            <FontAwesomeIcon icon={fasHeart} size="2x" className="favorite-icon" color="red"/>
                        </div>
                        }
                    </div>
                    <div className="product-info-sub">
                        <div className="product-price">
                            {product.Product.price} ₽
                        </div>
                        <div className="product-rating">
                            <StarRatings
                                rating={product.Product.rating ? product.Product.rating : 0}
                                starRatedColor="red"
                                numberOfStars={5}
                                name='rating'
                                starDimension='15px'
                                starSpacing='4px'
                            />
                            <span className="product-rating-count ml-1">({product.Product.rating_count})</span>
                        </div>
                    </div>
                </div>
            </a>
            }
        </React.Fragment>


    )
}
