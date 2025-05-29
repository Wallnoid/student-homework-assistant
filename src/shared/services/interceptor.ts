import axios from 'axios';
import { getToken, removeToken } from '../utils/localStorage.utils';

const interceptor = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interceptor.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }


        return config;
    },
    (error) => Promise.reject(error)
);

interceptor.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            window.location.href = '/login';

            removeToken();
        }
        if (error.response.status === 403) {
            window.location.href = '/login';
            removeToken();
        }
        if (error.response.status === 404) {
            window.location.href = '/login';
            removeToken();
        }

        if (error.response.status === 500) {
            window.location.href = '/login';
            removeToken();
        }

        return Promise.reject(error);
    }
);

export default interceptor;
