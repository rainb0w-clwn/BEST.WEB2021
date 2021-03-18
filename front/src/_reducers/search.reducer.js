import { searchConstants } from '../_constants';

const category = [];
const store_type = [];
const name = '';
export function search(state = {category, store_type, name}, action) {

    switch (action.type) {
        case searchConstants.SEARCH_SET_INPUT_SUCCESS:
            return {
                ...state,
                needCategories: 0
            }
        case searchConstants.DELETE_FROM_ARRAY: {
            state.category = state.category.filter((ele) => {
                return ele != action.value;
            });
            state.store_type = state.store_type.filter((ele) => {
                return ele != action.value;
            });
            console.log(state)
            return {
                ...state,
            }
        }
        case searchConstants.SEARCH_SET_INPUT:
            if (action.input.priceFrom == '') {
                action.input.priceFrom = 0;
            }
            if (action.input.priceTo == '') {
                action.input.priceTo = 0;
            }
            if (state.name == '') {
                action.input.needCategories = 1;
            }
            if (action.input.name && state.name && action.input.name != state.name) {
                action.input.needCategories = 1;
            }
            if (action.input.category != null) {
                state.category.push(action.input.category)
                delete action.input.category;
            }
            if (action.input.store_type != null) {
                state.store_type.push(action.input.store_type)
                delete action.input.store_type;
            }
            return {
                ...state,
                ...action.input,
            };
        default:
            return state
    }
}
