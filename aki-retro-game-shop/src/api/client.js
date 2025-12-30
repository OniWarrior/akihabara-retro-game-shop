/*
 * Author : Stephen Aranda
 * File   : client.js
 * Desc   : centralized axios instance for api calls
 */

import axios from "axios";
import { useCsrfStore } from "@/stores/CsrfStore";

// axios instance that will be used for api calls that need interceptors
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

const unsafe = new Set(["post", "put", "patch", "delete"]);

// interceptors that attach the csrf token to unsafe requests.
api.interceptors.request.use(async (config) => {
    const method = (config.method || "get").toLowerCase();

    // if unsafe not GET- retrieve the token
    if (unsafe.has(method)) {
        const csrfStore = useCsrfStore();

        if (!csrfStore.csrfToken) {
            await csrfStore.fetchToken(); // important
        }

        if (csrfStore.csrfToken) {
            config.headers = config.headers || {};
            config.headers["X-CSRF-Token"] = csrfStore.csrfToken;
        }
    }

    return config;
}, Promise.reject);

export default api;