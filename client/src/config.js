import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 7000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let isRefreshing = false; 
let refreshPromise = null;

const getValidToken = async () => {
    if (isRefreshing) {
        return refreshPromise;
    }

    isRefreshing = true;
    refreshPromise = updateAccessToken();

    try {
        const accessToken = await refreshPromise;
        isRefreshing = false;
        return accessToken;
    } catch (error) {
        isRefreshing = false;
        throw error;
    }
};

axiosInstance.interceptors.request.use(
    async (config) => {
        if (config.url === '/api/users/create-account' || config.url === '/api/users/login') {
            return config;  
        }
        try {
            const accessToken = await getValidToken();
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        } catch (error) {
            console.log('Error while getting valid token:', error);
        }
        return config;
    },
    (error) => {
        console.log('Request error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log('Response error:', error);
        return Promise.reject(error);
    }
);

const updateAccessToken = async () => {
    try {
        const response = await axios.post(`${API_URL}/api/users/updateToken`, {}, { withCredentials: true });
        return response.data.accessToken;
    } catch (e) {
        if (e.response && e.response.status === 401) {
            window.location.href = '/login';
            alert('Your session has expired.Please login')
        }
        return null;
    }
};
