import Axios, { AxiosInstance } from 'axios';

const getToken = () => JSON.parse(localStorage.getItem('token') as string);
const axios: AxiosInstance = Axios.create({
    baseURL: 'http://storefront2-env.eba-v9zjpmhf.us-east-1.elasticbeanstalk.com',
    // timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `${getToken()?.type} ${getToken()?.value}`,
    },
});
export default axios;
