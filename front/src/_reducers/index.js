import { combineReducers } from 'redux';

import { auth } from './auth.reducer';
import { users } from './user.reducer';
import { alert } from './alert.reducer';
import { products } from './product.reducer';
import { search } from './search.reducer';


const rootReducer = combineReducers({
    auth,
    users,
    alert,
    products,
    search,
});

export default rootReducer;
