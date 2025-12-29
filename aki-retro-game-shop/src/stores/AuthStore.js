/*
 * Author : Stephen Aranda
 * File   : AuthStore.js
 * Desc   : Auth Store for tracking user state. along with action suite
 */

import { defineStore } from "pinia";
import { apiFetch } from "@/api/client";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,              // { user_id, username } from session
        authenticated: false,
        checked: false,          // have we called /status at least once?
        csrfToken: null,         // cached token for this session
        loading: false,
        error: null,
    }),

    getters: {
        isAuthenticated: (state) => state.authenticated,
    },

    actions: {
        // --- CSRF ---
        async fetchCsrf() {
            // fetch once per session (fine to re-fetch too, but cache is nice)
            if (this.csrfToken) return this.csrfToken;

            // Make api call to get csrf token
            const response = await apiFetch("/api/auth/csrf");
            this.csrfToken = response.csrfToken;
            return this.csrfToken;
        },

        // returns stored token
        _csrfHeader() {
            if (!this.csrfToken) return {};
            return { "X-CSRF-Token": this.csrfToken };
        },

        // --- Session status ---
        async status() {

            // start the api call for checking authentication
            this.loading = true;       // initial load is true
            this.error = null;         // no error yet.

            try {

                // make the api call to get the status from the session
                const response = await apiFetch("/api/auth/status");

                // successful- store in local authenticated property
                this.authenticated = !!response.authenticated;

                // return user data if authenticated is true otherwise return null
                this.user = response.authenticated ? response.user : null;

                // set checked status to true
                this.checked = true;

                // if not authenticated, csrf token is irrelevant
                if (!this.authenticated) this.csrfToken = null;

                return response;

                // api call failed- set the failure message
            } catch (err) {
                this.error = err.message;
                this.checked = true;
                this.authenticated = false;
                this.user = null;
                this.csrfToken = null;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        // --- Auth actions ---
        async login(userCredentials) {

            // start api call 
            this.loading = true;
            this.error = null;

            try {
                // Fetch the locally stored CSRF token for login api call.
                const token = await this.fetchCsrf();

                const response = await apiFetch("/api/auth/login", {
                    method: "POST",
                    headers: token,
                    body: JSON.stringify(userCredentials),
                });

                // have confirmation of login message popup
                alert(response.message)

                // login response does NOT include user, so hydrate from /status
                await this.status();
            } catch (err) {
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async signup(userCredentials) {

            // start api call 
            this.loading = true;
            this.error = null;

            try {
                // get the CSRF token for api call authentication
                const token = await this.fetchCsrf();

                const signup = await apiFetch("/api/auth/signup", {
                    method: "POST",
                    headers: token,
                    body: JSON.stringify(userCredentials),
                });

                // confirmation message for register confirmation
                alert(signup.message);
            } catch (err) { // failure of api call set error message
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        // action for logout
        async logout() {

            // start the api call
            this.loading = true;
            this.error = null;

            try {
                // get csrf token
                const token = await this.fetchCsrf();

                // make api call to logout
                const loggedOut = await apiFetch("/api/auth/logout", {
                    method: "POST",
                    headers: token,
                });


                // show logged out popup
                alert(loggedOut.message);

                // clear local state
                this.user = null;
                this.authenticated = false;
                this.checked = true;
                this.csrfToken = null;
            } catch (err) {
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },


        // api call for changing current password of user.
        async changePassword({ newPassword, confirmPassword }) {

            // start of api call
            this.loading = true;
            this.error = null;

            try {

                // get the csrf token
                const token = await this.fetchCsrf();

                const changedPassword = await apiFetch("/api/auth/change-password", {
                    method: "POST",
                    headers: token,
                    body: JSON.stringify({ newPassword, confirmPassword }),
                });

                // alert message confirmation
                alert(changedPassword.message);

                // backend logs user out explicitly, so clear local state
                this.user = null;
                this.authenticated = false;
                this.checked = true;
                this.csrfToken = null;

                // failure message if api call fails 
            } catch (err) {
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },


    },
});