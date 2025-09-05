import axios from "axios";

const API_URL = 'https://api.escuelajs.co/api/v1/auth';

const apiClient = axios.create({
    baseURL: API_URL,
});

export default apiClient;
