import {productConstants, searchConstants} from '../_constants';
import { alertActions } from './';
import { history } from '../_helpers';

export const searchActions = {
    set_filters,
    delete_from_array,
};

function set_filters(input) {
    return dispatch => {
        dispatch(request({ input }));
    }
    function request({input}) { return { type: searchConstants.SEARCH_SET_INPUT, input } }
}

function delete_from_array(name, value) { return { type: searchConstants.DELETE_FROM_ARRAY, action: {name, value} } }

