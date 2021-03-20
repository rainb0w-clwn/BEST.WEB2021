import React, {useCallback, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Container, Row, Col, Button} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import {productActions, searchActions, userActions} from "../_actions";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const ProductSort = () => {
    const dispatch = useDispatch();
    const search = useSelector(state => state.search);
    const products = useSelector(state => state.products);
    const [name, setName] = useState(search.name);
    const [sort, setSort] = useState({price: '', rating: ''});
    useEffect(() => {
        setName(search.name);
        setSort({price: '', rating: ''})
    }, [search.name])
    function sortChange(e) {
        let type = e.target.dataset.type;
        switch (type) {
            case 'price':
                if (sort.price == 'ASC') {
                    search.sortBy = { price: 'DESC'};
                    dispatch(productActions.getProducts(search));
                    setSort({rating: '', price: 'DESC'})
                } else if (sort.price == 'DESC') {
                    search.sortBy = {rating: '', price: 'ASC'};
                    dispatch(productActions.getProducts(search));
                    setSort({rating: '', price: 'ASC'})
                } else {
                    search.sortBy = {rating: '', price: 'ASC'};
                    dispatch(productActions.getProducts(search));
                    setSort({rating: '', price: 'ASC'})
                }
                break;
            case 'rating':
                if (sort.rating == 'ASC') {
                    search.sortBy = {price: '', rating: 'DESC'}
                    dispatch(productActions.getProducts(search));
                    setSort({price: '', rating: 'DESC'})
                } else if (sort.rating == 'DESC') {
                    search.sortBy = {price: '', rating: 'ASC'}
                    dispatch(productActions.getProducts(search));
                    setSort({price: '', rating: 'ASC'})
                } else {
                    search.sortBy = {price: '', rating: 'ASC'}
                    dispatch(productActions.getProducts(search));
                    setSort({price: '', rating: 'ASC'})
                }
                break;
        }
    }
    return (
        <React.Fragment>
            {(!products.loading || products.search_started) && products.search_type==='search' && products.products_data && products.products_data.length > 0 &&
            <div id="product-sort">
                <Row className="product-sort-container flex-nowrap">
                    <Col className="flex-grow-2">
                    <span>
                        сортировать по:
                    </span>
                    </Col>
                    <Col className="flex-grow-1 align-text-center">
                    <span className="sort-span" data-type= "price" onClick={sortChange}>
                        цена
                        {sort.price == 'ASC' && <FontAwesomeIcon className="ml-1" icon={faArrowUp} color="grey"/>}
                        {sort.price == 'DESC' && <FontAwesomeIcon className="ml-1" icon={faArrowDown} color="grey"/>}
                    </span>
                    </Col>
                    <Col className="flex-grow-1 align-text-center">
                    <span className="sort-span" data-type= "rating" onClick={sortChange}>
                        рейтинг
                        {sort.rating == 'ASC' && <FontAwesomeIcon className="ml-1" icon={faArrowUp} color="grey"/>}
                        {sort.rating == 'DESC' && <FontAwesomeIcon className="ml-1" icon={faArrowDown} color="grey"/>}
                    </span>
                    </Col>
                </Row>
            </div>
            }
        </React.Fragment>
    )
}
