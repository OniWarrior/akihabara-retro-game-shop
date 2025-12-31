/*
 * Author : Stephen Aranda
 * File   : client.js
 * Desc   : centralized axios instance for api calls
 */

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,                // IMPORTANT: sends session cookies
});

let csrfToken = null;

/**
 * Fetch CSRF token and cache it in this module.
 * Must be called at app startup and after login/logout sessions are rotated.
 */
export async function initCsrf() {
    const res = await api.get("/api/auth/csrf");
    csrfToken = res.data.csrfToken;
    return csrfToken;
}

export function getCsrf() {
    return csrfToken;
}

export function clearCsrf() {
    csrfToken = null;
}

// Attach CSRF token automatically to state-changing requests
api.interceptors.request.use((config) => {
    const method = (config.method || "get").toLowerCase();
    const isStateChanging = ["post", "put", "patch", "delete"].includes(method);

    if (isStateChanging && csrfToken) {
        config.headers = config.headers || {};
        config.headers["X-CSRF-Token"] = csrfToken;
    }

    return config;
});

export default api;