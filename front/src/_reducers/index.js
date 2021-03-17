import { combineReducers } from 'redux';

import { auth } from './auth.reducer';
import { users } from './user.reducer';
import { alert } from './alert.reducer';
import { products } from './product.reducer';


const rootReducer = combineReducers({
    auth,
    users,
    alert,
    products,
});

export default rootReducer;
