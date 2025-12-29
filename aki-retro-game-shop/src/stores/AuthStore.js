import { defineStore } from "pinia";

import apiFetch from "@/api/client";


export const useAuthStore = defineStore('auth', {

    // information being tracked about the user.
    state: () => ({
        user: null,  // user 
        checked: false,   // have we checked auth status at least once
        loading: false,
        error: null

    }),

    // retrieve user state object
    getters: {
        isAuthenticated: (state) => !!state.user

    },


    // action suite - api calls
    actions: {

        // check if user is authenticated
        async checkStatus() {

            try {


                // start of api call

                // set loading and error to true and null
                this.loading = true;
                this.error = null;

                // make api call
                const response = await apiFetch("/auth/status");

                // assign user session object to this.user if the user is authenticated.
                this.user = response.authenticated ? response.user : null;

                // checked if the user is authenticated
                this.checked = true;
                return response;

            } catch (err) {
                // If backend uses 401 for "not logged in"
                if (err.status === 401) {
                    this.user = null;
                    this.checked = true;
                    return;
                }
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }

        },

        // post login
        async login({ username, password }) {


            try {

                // Start the api call
                // set loading and error to true and null.
                this.loading = true;
                this.error = null;

                // make api call
                const response = await apiFetch("/auth/login", {
                    method: "POST",
                    body: JSON.stringify({ username, password }),
                });



                return response;
            } catch (err) {
                // error message if login fails
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        // logout api call 
        async logout() {


            try {

                // start the api call and set loading and error to true and null
                this.loading = true;
                this.error = null;

                // make api call
                const response = await apiFetch("/auth/logout", { method: "POST" });

                // set user to null- they've been logged out. This clears state.
                this.user = null;

                // we have checked status

                this.checked = true;

                return response
            } catch (err) {
                // error message if logout fails
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

    }




})