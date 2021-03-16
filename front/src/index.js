
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'

import {store} from './_helpers'
import {App} from "./App";
import './index.css';

render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById("app")
);

