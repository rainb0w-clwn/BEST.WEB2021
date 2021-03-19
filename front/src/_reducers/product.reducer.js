import { productConstants } from '../_constants';

export function products(state = {}, action) {
    switch (action.type) {
        case productConstants.GET_BY_QUERY_REQUEST:
            return {
                ...state,
                loading: true,
                search_type: 'search',
                search_name: action.products.name || null,
            };
        case productConstants.GET_BY_QUERY_RETRY_REQUEST:
            return {
                ...state,
                loading: true,
                search_type: 'search',
                search_name: action.products.name || null,
            };
        case productConstants.GET_BY_QUERY_SUCCESS:
            return {
                loading: false,
                search_started: true,
                search_type: 'search',
                search_name: action.products.name || null,
                page: action.products.page,
                page_count: action.products.pageCount,
                categories: action.products.categories,
                store_types: action.products.store_types,
                products_data: action.products.data,
            };
        case productConstants.GET_BY_QUERY_RETRY_SUCCESS:
            return {
                loading: false,
                search_started: true,
                search_type: 'search',
                search_name: action.products.name || null,
                page: action.products.page,
                page_count: action.products.pageCount,
                categories: state.categories,
                store_types: state.store_types,
                products_data: action.products.data,
            };
        case productConstants.GET_BY_QUERY_FAILURE:
            return {
                error: action.error
            };
        //GET FAVORITES
        case productConstants.GET_FAVORITES_REQUEST:
            return {
                search_type: 'favorite',
                loading: true
            };
        case productConstants.GET_FAVORITES_SUCCESS:
            return {
                loading: false,
                search_type: 'favorite',
                products_data: action.products.data,
            };
        case productConstants.GET_FAVORITES_FAILURE:
            return {
                error: action.error
            };
            //SET FAVORITES
        case productConstants.SET_FAVORITE_REQUEST:
            return {
                ...state,
                favorite_changed: false,
            };
        case productConstants.SET_FAVORITE_SUCCESS:
            return {
                ...state,
                favorite_changed: true,
            };
        case productConstants.SET_FAVORITE_FAILURE:
            return {
                error: action.error
            };
            //DELETE FAVORITE
        case productConstants.DELETE_FAVORITE_REQUEST:
            return {
                ...state,
                favorite_changed: false,
            };
        case productConstants.DELETE_FAVORITE_SUCCESS:
            return {
                ...state,
                favorite_changed: true,
            };
        case productConstants.DELETE_FAVORITE_FAILURE:
            return {
                error: action.error
            };

        default:
            return state
    }

}
