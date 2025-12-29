/*
 * Author : Stephen Aranda
 * File   : AuthStore.js
 * Desc   : Auth Store for tracking csrf token. along with action suite
 */

import { defineStore } from "pinia";
import api from "@/api/client";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        csrfToken: {},   // csrf token
        loading: false,  // is the action loading
        error: ""        // error message in the event an action fails
    }),

    getters: {
        getToken: (state) => state.csrfToken,
        isLoading: (state) => state.loading,
        getError: (state) => state.error
    },

    // Actions are the setters
    actions: {
        // fetchCsrf: Retrieves csrf token from the backend
        async fetchCsrfToken() {

            // Make api call to get csrf token
            const response = await api("/api/auth/csrf");

            // store the retrieved token in state object
            this.csrfToken = response.csrfToken;
            return this.csrfToken;
        }
    }

});