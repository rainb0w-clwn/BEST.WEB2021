import React, {useCallback, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Container, Row, Col, Button} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import {productActions, searchActions, userActions} from "../_actions";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const ProductSort = () => {
    const dispatch = useDispatch();
    const search_name = useSelector(state => state.search.name);
    const store_types = useSelector(state => state.products.store_types)
    const categories = useSelector(state => state.products.categories);
    const search = useSelector(state => state.search);
    const products = useSelector(state => state.products);

    function handleChange(e) {
        const {name, value} = e.target;
        dispatch(searchActions.set_filters({[name]: value}));
    }
    function handleChangeRating(newRating, name) {
        dispatch(searchActions.set_filters({[name]: newRating}));
    }
    function handleClick(e) {
        e.preventDefault();
        if (search_name) {
            dispatch(productActions.getProducts(search));
        }
    }
    const rating = useSelector(state => state.search.rating) || 0;
    return (
        <React.Fragment>
            {products.products_data &&
            <div id="product-sort">
                <div className="product-sort-container">
                    <Col>
                    <span>
                        цена
                    </span>
                        <FontAwesomeIcon className="ml-1" icon={faArrowDown} color="grey"/>
                    </Col>
                    <Col>
                    <span>
                        рейтинг
                    </span>
                        <FontAwesomeIcon className="ml-1" icon={faArrowDown} color="grey"/>
                    </Col>
                </div>
            </div>
            }
        </React.Fragment>
    )
}
