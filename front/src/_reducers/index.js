import { combineReducers } from 'redux';

import { auth } from './auth.reducer';
import { users } from './user.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    auth,
    users,
    alert
});

export default rootReducer;
