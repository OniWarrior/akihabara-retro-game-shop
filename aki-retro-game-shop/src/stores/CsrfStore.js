/*
 * Author : Stephen Aranda
 * File   : CsrfStore.js
 * Desc   : CSRF Store for tracking csrf token. along with action suite
 */

import { defineStore } from "pinia";
import plain from "@/api/plainClient";

export const useCsrfStore = defineStore("csrf", {
    state: () => ({
        csrfToken: null,  // csrf token that was retrieved from backend
        loading: false,   // prior to api call
        error: null,     // errror message if api call fails
    }),

    actions: {

        // fetchToken: action that fetches a new token
        async fetchToken(force = false) {

            // if no refresh return cached token
            if (!force && this.csrfToken) return this.csrfToken;

            // prior to api call load is true and error message is null
            this.loading = true;
            this.error = null;

            try {
                const response = await plain.get("/csrf");
                this.csrfToken = response.data.csrfToken;
                return this.csrfToken;
            } catch (err) {
                // failure response occurs- assign error message
                this.csrfToken = null;
                this.error = err.response?.data?.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        // clear for fresh token and message.
        clear() {
            this.csrfToken = null;
            this.error = null;
        },
    },
});