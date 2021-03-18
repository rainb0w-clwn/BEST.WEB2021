import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {store} from './_helpers'
import {App} from "./App";
import './index.css';
import $ from '../public/js/jquery-3.6.0.min'


var body = $('body');
body.find(".dropdown-menu").click(function(e){
    e.stopPropagation();
})
body.find('.dropdown-toggle').on('click', function (e) {
    $(this).next().toggle();
});


render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById("app")
);

