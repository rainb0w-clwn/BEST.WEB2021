import React, {useCallback, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Container, Row, Col, Button} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import {productActions, searchActions, userActions} from "../_actions";
import $ from 'jquery';
export const ProductFilter = () => {
    const dispatch = useDispatch();
    const search_name = useSelector(state => state.search.name) || null;
    const store_types = useSelector(state => state.products.store_types) || null;
    const categories = useSelector(state => state.products.categories) || null;
    const products_data = useSelector(state => state.products.products_data) || null;
    const search = useSelector(state => state.search);

    function handleChange(e) {
        const {name, value} = e.target;
        const input = e.target.closest('input');
        if (input && input['checked'] == false) {
            let checkName = '';
            if (input['name'] == 'category') {
                checkName = 'categories'
            }
            if (input['name'] == 'store_type') {
                checkName = 'store_types'
            }
            dispatch(searchActions.delete_from_array(checkName,input.value));
        } else {
            dispatch(searchActions.set_filters({[name]: value}));
        }
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
    const loading = useSelector(state => state.loading);
    const rating = useSelector(state => state.search.rating) || 0;
    if (products_data != null) {
        return (
            <React.Fragment>
                {loading &&
                <div id="header-bottom-section">
                    <div id="product-filters">
                        <Container fluid className="">
                            <Row className="justify-content-around align-items-center flex-row">
                                <Col xs={4}>
                                    <Row className="justify-content-around align-items-center">
                                        <Col xs={6}>
                                            <Button block type="button" variant="default" className="dropdown-toggle"
                                                    data-toggle="dropdown">Категория</Button>
                                            <div className="dropdown-menu scrollable-menu" role="menu"
                                                 data-display="static">
                                                <Container className="flex-column">
                                                    {categories.length > 0 && categories.map((category, index) =>
                                                        <div key={index} className="form-check my-3 dropdown-item">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input"
                                                                       data-plural='categories' name="category"
                                                                       onChange={handleChange}
                                                                       value={category.category}/>
                                                                {category.category} ({category.count})
                                                            </label>
                                                        </div>
                                                    )}
                                                </Container>

                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <Button block type="button" variant="default" className="dropdown-toggle"
                                                    data-toggle="dropdown">Магазин</Button>
                                            <div className="dropdown-menu scrollable-menu" role="menu"
                                                 data-display="static">
                                                <Container className="flex-column">
                                                    {store_types && store_types.map((store, index) =>
                                                        <div key={index} className="form-check my-3 dropdown-item">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input"
                                                                       name="store_type" data-plural='store_types'
                                                                       onChange={handleChange}
                                                                       value={store.store_type}/>
                                                                {store.store_type} ({store.count})
                                                            </label>
                                                        </div>
                                                    )}
                                                </Container>

                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2}>
                                    <Button block type="button" variant="danger"
                                            onClick={handleClick}>Применить</Button>
                                </Col>
                                <Col xs={4}>
                                    <Row className="justify-content-center align-items-center">
                                        <Col xs={6}>
                                            <div className="flex-column justify-content-around align-items-center">
                                                <StarRatings
                                                    rating={rating}
                                                    name="{rating}"
                                                    starRatedColor="gold"
                                                    starHoverColor="gold"
                                                    changeRating={handleChangeRating}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension='18px'
                                                    starSpacing='4px'
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <Row
                                                className="flex-column justify-content-around align-items-center flex-nowrap">
                                                <span className="mb-1">Цена</span>
                                                <Row>
                                                    <Col xs={5}>
                                                        <div><input type="text" className="form-control"
                                                                    name="priceFrom"
                                                                    onChange={handleChange}/></div>
                                                    </Col>
                                                    <Col xs={1}>
                                                        <span>—</span>
                                                    </Col>
                                                    <Col xs={5}>
                                                        <div>
                                                            <input type="text" className="form-control" name="priceTo"
                                                                   onChange={handleChange}/>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                }
            </React.Fragment>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}
