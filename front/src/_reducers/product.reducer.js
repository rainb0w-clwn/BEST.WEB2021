import { productConstants } from '../_constants';

export function products(state = {}, action) {
    switch (action.type) {
        case productConstants.GET_BY_QUERY_REQUEST:
            return {
                loading: true
            };
        case productConstants.GET_BY_QUERY_SUCCESS:
            return {
                page: action.products.page,
                page_count: action.products.pageCount,
                categories: action.products.categories,
                store_types: action.products.store_types,
                products_data: action.products.data,
            };
        case productConstants.GET_BY_QUERY_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
