/*
 * Author : Stephen Aranda
 * File   : client.js
 * Desc   : api client for session cookies
 */

// import env for api backend
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const apiFetch = async (path, options = {}) => {

    const res = await fetch(`${API_BASE},${path}`, {
        credentials: "include", // sends/ receives session cookies
        headers: {
            "Content-type": "application/json",
            ...(options.headers || {})

        },
        ...options
    })

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
        const message = data?.message || `Request failed: ${res.status}`;
        const err = new Error(message);
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data;
}

export default apiFetch;