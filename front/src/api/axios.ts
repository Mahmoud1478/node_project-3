import Axios, { AxiosInstance } from 'axios';

const getToken = () => JSON.parse(localStorage.getItem('token') as string);

const axios: AxiosInstance = Axios.create({
    baseURL: import.meta.env['VITE_BASE_URL'] || 'http://localhost:3000',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `${getToken()?.type} ${getToken()?.value}`,
    },
});
export default axios;
