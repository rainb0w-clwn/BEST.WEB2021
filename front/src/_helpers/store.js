import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware, loggerMiddleware],

})
