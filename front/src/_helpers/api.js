import axios from "axios";
import config from "config";

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
};
