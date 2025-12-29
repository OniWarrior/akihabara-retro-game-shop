/*
 * Author : Stephen Aranda
 * File   : client.js
 * Desc   : centralized axios instance for api calls
 */

import axios from "axios";
import { useAuthStore } from "@/stores/AuthStore";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // Crucial: Allows cookies to be sent/received
    withXSRFToken: true,   // Modern Axios versions handle the header automatically
});

// Attach the interceptor to this specific instance
api.interceptors.request.use((config) => {

    // get the token from the auth store
    const authStore = useAuthStore();
    const csrfToken = authStore.csrfToken;

    // set the token if it's present
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;



