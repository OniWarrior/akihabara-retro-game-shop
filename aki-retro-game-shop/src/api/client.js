/*
 * Author : Stephen Aranda
 * File   : client.js
 * Desc   : api client for session cookies
 */

// Base url for the api backend
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// headers that will be sent on api calls
function buildHeaders(extra = {}) {
    return {
        "Content-Type": "application/json",
        ...extra,
    };
}


// function that will serve as a generic template for api calls for the front end.
export async function apiFetch(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: "include", //  send session cookie
        ...options,
        headers: buildHeaders(options.headers || {}),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    // template for api failure request.
    if (!res.ok) {
        const err = new Error(data?.message || `Request failed: ${res.status}`);
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data;
}