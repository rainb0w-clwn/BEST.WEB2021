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
        console.log(error);
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


axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;

        if (
            (error.response.status === 401
                && !originalRequest._retry)) {
            originalRequest._retry = true;
            return userService.refreshToken();
        }
        return Promise.reject(error);
    }
);
