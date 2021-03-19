import config from 'config';
import {api} from '../_helpers';
import {userService} from './';
import axios from 'axios';

export const productService = {
    getProducts,
    setFavorite,
    getFavorites,
    deleteFavorite
    // logout,
};

function getProducts(userInput) {
    return api.getProducts(userInput).then(res => {
        return res.data;
    }).catch(error =>{
        console.log(error);
        return Promise.reject();
    });
}
function getFavorites() {
    return api.getFavorites().then(res => {
        return res.data;
    }).catch(error =>{
        return Promise.reject();
    });
}
function setFavorite(productId) {
    return api.setFavorite(productId).then(res => {
        return res.data;
    }).catch(error =>{
        console.log(error);
        return Promise.reject();
    });
}
function deleteFavorite(productId) {
    return api.deleteFavorite(productId).then(res => {
        return res.data;
    }).catch(error =>{
        console.log(error);
        return Promise.reject();
    });
}
function logout() {
    localStorage.removeItem('user');
    return api.logout().then(res => {
        return res;
    }).catch(error => {
        return Promise.reject();

    });
}

