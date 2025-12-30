/*
 * Author : Stephen Aranda
 * File   : AuthStore.js
 * Desc   : Auth Store for tracking user state information. along with action suite
 */

import { defineStore } from "pinia";
import api from "@/api/client";
import { useCsrfStore } from "@/stores/CsrfStore";


export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,               // user object for user information
        authenticated: false,     // authenticated prop to check for authentication on protected routes
        loading: false,          // loading prop prior to or after api calls are made
        error: null,             // error message if api call fails
        lastCheckedAt: null,      // date that shows last status check
    }),

    getters: {
        // get authentication prop
        isAuthenticated: (state) => state.authenticated,
    },

    // action suite
    actions: {
        // clear error message
        clearError() {
            this.error = null;
        },

        // reset state object
        reset() {
            this.user = null;
            this.authenticated = false;
            this.loading = false;
            this.error = null;
            this.lastCheckedAt = null;
        },

        // INTERNAL: no loading/error mutation (prevents flicker)
        async _checkStatusSilent() {
            try {

                // make api call to get status
                const res = await api.get("/api/auth/status");

                // assign returned user and authenticated to state object props
                this.authenticated = !!res.data.authenticated;
                this.user = res.data.user ?? null;
                this.lastCheckedAt = Date.now();

                return this.authenticated;
            } catch {
                this.authenticated = false;
                this.user = null;
                this.lastCheckedAt = Date.now();
                return false;
            }
        },

        // PUBLIC: for pages/guards that want spinner/error behavior
        async checkStatus() {
            this.loading = true;
            this.error = null;

            try {
                return await this._checkStatusSilent();
            } catch (err) {
                // _checkStatusSilent never throws, but keep this defensive
                this.error = err.response?.data?.message;
                return false;
            } finally {
                this.loading = false;
            }
        },

        // POST /api/auth/login -> logs the user in
        async login({ username, password }) {
            this.loading = true;
            this.error = null;

            try {

                const user = { username, password }

                // make api call to log user in
                const loggedIn = await api.post("/api/auth/login", user);

                // confirm log in
                alert(`${loggedIn.message}`);


                // pull req.session.user without flicker
                await this._checkStatusSilent();


            } catch (err) {
                // failed api call
                this.authenticated = false;
                this.user = null;
                this.error = err.response?.data?.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        // POST /api/auth/signup : create account
        async signup({ username, password }) {
            this.loading = true;
            this.error = null;

            try {

                const user = { username, password }
                const res = await api.post("/api/auth/signup", user);

                // confirmation message
                alert(`${res.message}`);

                // get user info and authenticated
                await this._checkStatusSilent();



            } catch (err) {
                // api failure response.
                this.error = err.response?.data?.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        // POST /api/auth/logout: logout user
        async logout() {
            this.loading = true;
            this.error = null;

            try {

                // make api call to logout user
                const loggedOut = await api.post("/api/auth/logout");

                // confirmation message
                alert(`${loggedOut.message}`);

            } catch {
                // ignore; still clear locally
            } finally {
                this.user = null;
                this.authenticated = false;
                this.lastCheckedAt = Date.now();

                // clear CSRF for clean slate (optional but nice)
                const csrf = useCsrfStore();
                csrf.clear();

                this.loading = false;
            }
        },

        // POST /api/auth/change-password: change forgotten password
        async changePassword({ newPassword, confirmPassword }) {
            this.loading = true;
            this.error = null;

            try {

                const user = { newPassword, confirmPassword };

                // make api call to change the forgotten password
                const res = await api.post("/api/auth/change-password", user);

                alert(`${res.message}`);


            } catch (err) {
                this.error = err.response?.data?.message || "Change password failed";
                throw err;
            } finally {
                this.loading = false;
            }
        },

        //  call once on app start
        async bootstrap() {

            return await this.checkStatus();
        },
    },
});