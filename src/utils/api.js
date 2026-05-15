import axios from "axios";

export const BASE_URL = `http://${window.location.hostname}:5000`;

const API = axios.create({
    baseURL: `${BASE_URL}/api`
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    // Prevent caching on all GET requests to ensure auto-refresh works in dashboard
    if (req.method.toLowerCase() === 'get') {
        req.params = { ...req.params, _t: new Date().getTime() };
    }

    return req;
});

export default API;