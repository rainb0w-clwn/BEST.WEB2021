import config from 'config';
import {authHeader, api} from '../_helpers';
import axios from 'axios';
export const userService = {
    login,
    logout,
    refreshToken
};

function login(login, password) {
    return api.login({login, password}).then(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (res.data.token) {
            localStorage.setItem('user', JSON.stringify(res.data));
        }
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

function refreshToken() {
    return api.refreshToken().then(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data));
            return res.data;
        } else {
            return Promise.reject();
        }
    }).catch(error =>{
        console.log(error);
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
                && (error.response.error == 'UnauthorizedError' && error.response.message == 'jwt expired')
                    && !originalRequest._retry)) {
            originalRequest._retry = true;
            return refreshToken();
        }
        return Promise.reject(error);
    }
);

// axios.defaults.withCredentials = true
//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem("user");
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };
//
//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }
//
// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 // logout();
//                 window.location.reload(true);
//             }
//
//             const error = (data && data.message) || response.statusCode;
//             return Promise.reject(error);
//         }
//
//         return data;
//     });
// }
