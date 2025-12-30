/*
 * Author : Stephen Aranda
 * File   : plainClient.js
 * Desc   : centralized axios instance for api calls without interceptors.
 */


import axios from "axios";

const plain = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

export default plain;