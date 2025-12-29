/*
 * Author : Stephen Aranda
 * File   : CsrfStore.js
 * Desc   : CSRF Store for tracking csrf token. along with action suite
 */

import { defineStore } from "pinia";
import api from "@/api/client";

export const useCsrfStore = defineStore("auth", {
    state: () => ({
        csrfToken: {},   // csrf token
        loading: false,  // is the action loading
        error: ""        // error message in the event an action fails
    }),

    getters: {
        getToken: (state) => !!state.csrfToken,

    },

    // action suite---api calls
    actions: {

        // fetchToken: api call to get a csrf token for state changing api calls.
        async fetchToken() {

            try {

                // start the api call by setting loading to true
                this.loading = true;

                // initial error message is null
                this.error = null;

                // make api call and store result
                const response = await api.get("/csrf");

                // extract the token from the response
                const token = response.data.csrfToken;

                // assign the returned token to state property for caching
                this.token = token;

                return token;
            } catch (err) {
                // if the api call failed-token is null
                this.token = null;

                // assign the returned error message
                this.error = err.responseponse?.data?.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        // clear current token and error for next api call.
        clear() {
            this.token = null;
            this.error = null;

        }
    }

});