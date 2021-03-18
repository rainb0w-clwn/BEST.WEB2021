import React, {useCallback, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Container, Row, Col, Button} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import {productActions, searchActions, userActions} from "../_actions";

export const ProductSort = () => {
    const dispatch = useDispatch();
    const search_name = useSelector(state => state.search.name);
    const store_types = useSelector(state => state.products.store_types)
    const categories = useSelector(state => state.products.categories);
    const search = useSelector(state => state.search);

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
        <div id="product-sort">
        </div>
    )
}
