import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const productActions = {
    getProducts,
};

function getProducts(userInput) {
    return dispatch => {
        dispatch(request({ userInput }));

        productService.getProducts(userInput)
            .then(
                products => {
                    dispatch(success(products));
                    // const params = new URLSearchParams(userInput);
                    // history.push('/search'+params);
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
}
