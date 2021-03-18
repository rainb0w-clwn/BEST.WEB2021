import {productConstants, searchConstants} from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const productActions = {
    getProducts,
    getFavorites,
    setFavorite,
    deleteFavorite,
};

function getProducts(userInput) {
    return dispatch => {
        let name = userInput.name ?? null;
        dispatch(request({ name }));
        productService.getProducts(userInput)
            .then(
                products => {
                    if (userInput.needCategories == 0) {
                        dispatch(success_retry(products));
                    } else {
                        dispatch(success(products));
                    }
                    dispatch(success_search());
                    const params = new URLSearchParams(userInput);
                    history.push('/search?'+params);
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(products) { return { type: productConstants.GET_BY_QUERY_REQUEST, products } }
    function success(products) { return { type: productConstants.GET_BY_QUERY_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GET_BY_QUERY_FAILURE, error } }
    function success_retry(products) { return { type: productConstants.GET_BY_QUERY_RETRY_SUCCESS, products } }
    function success_search() { return { type: searchConstants.SEARCH_SET_INPUT_SUCCESS } }
}

function getFavorites() {
    return dispatch => {
        dispatch(request());
        productService.getFavorites()
            .then(
                products => {
                    dispatch(success(products));
                    history.push('/favorite');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: productConstants.GET_FAVORITES_REQUEST } }
    function success(products) { return { type: productConstants.GET_FAVORITES_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GET_FAVORITES_FAILURE, error } }
}

function setFavorite(productId) {
    return dispatch => {
        dispatch(request());
        productService.setFavorite(productId)
            .then(
                products => {
                    dispatch(success(products));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: productConstants.SET_FAVORITE_REQUEST } }
    function success(products) { return { type: productConstants.SET_FAVORITE_SUCCESS, products } }
    function failure(error) { return { type: productConstants.SET_FAVORITE_FAILURE, error } }
}

function deleteFavorite(productId) {
    return dispatch => {
        dispatch(request());
        productService.deleteFavorite(productId)
            .then(
                products => {
                    dispatch(success(products));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: productConstants.DELETE_FAVORITE_REQUEST } }
    function success(products) { return { type: productConstants.DELETE_FAVORITE_SUCCESS, products } }
    function failure(error) { return { type: productConstants.DELETE_FAVORITE_FAILURE, error } }
}



