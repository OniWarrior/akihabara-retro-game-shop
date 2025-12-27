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
}