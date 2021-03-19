import axios from "axios";
import config from "config";
import {authHeader} from './'
import {userService} from "../_services";

export const api = {
    signup: (body) => {
        return axios.post(`${config.apiUrl}/auth/signup`, body,{withCredentials: true});
    },
    login: (body) => {
        return axios.post(`${config.apiUrl}/auth/signin`, body, {withCredentials: true});
    },
    refreshToken: () => {
        return axios.post(`${config.apiUrl}/auth/update-token`, {}, {withCredentials: true});
    },
    logout: () => {
        return axios.post(`${config.apiUrl}/auth/logout`, {},{withCredentials: true});
    },
    userMe: () => {
        return axios.get(`${config.apiUrl}/user/me`);
    },
    getProducts: (query) => {
        return axios.get(`${config.apiUrl}/product`, {params: query});
    },
    getFavorites: () => {
        let header = authHeader();
        return axios.get(`${config.apiUrl}/product/favorite`, {
            headers: {
                ...header,
            }
        });
    },
    setFavorite: (productId) => {
        let header = authHeader()
        return axios.post(`${config.apiUrl}/product/favorite/${productId}`, {product_id: productId}, {
            headers: {
                ...header,
            }
        });
    },
    deleteFavorite: (productId) => {
        let header = authHeader()
        return axios.delete(`${config.apiUrl}/product/favorite/${productId}`, {body: {product_id: productId},
            headers: {
                ...header,
            }
        });
    },
};

axios.interceptors.response.use(
    (response) => {
        if (response.error) {
            throw Error('loool');
        }
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        if (error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                return userService.refreshToken().then((data) => {
                    if (data.token) {
                        originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
                        console.log(axios.headers);
                        return axios(originalRequest).then((data) => {
                            return data
                        });
                    } else {
                        localStorage.removeItem('user');
                    }
                });
            }
            // client received an error response (5xx, 4xx)
        } else if (error.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }

        return Promise.reject(error);
    }
);
