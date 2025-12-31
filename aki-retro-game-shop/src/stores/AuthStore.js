/*
 * Author : Stephen Aranda
 * File   : AuthStore.js
 * Desc   : Auth Store for tracking user state information. along with action suite
 */

import { defineStore } from "pinia";
import api, { initCsrf, clearCsrf } from "@/api/client";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        authenticated: false, // matches backend authenticated
        loading: false,
        error: null,
        initialized: false,
    }),

    getters: {
        isAuthenticated: (state) => state.authenticated === true,
        isManager: (state) => state.user?.user_type === "Manager",
        isCustomer: (state) => state.user?.user_type === "Customer"
    },

    actions: {


        async init() {
            // called once on app startup
            this.loading = true;
            this.error = null;

            try {
                // establish CSRF for this browser session
                await initCsrf();

                // check whether session already exists
                const res = await api.get("/api/auth/status");

                this.authenticated = !!res.data.authenticated;
                this.user = res.data.user || null;

                this.initialized = true;
            } catch (err) {
                this.error = err?.response?.data?.message;
                this.authentication = false;
                this.user = null;
                this.initialized = true;
            } finally {
                this.loading = false;
            }
        },

        async signup({ username, password }) {
            this.loading = true;
            this.error = null;

            try {

                // make api call to signup
                const res = await api.post("/api/auth/signup", { username, password });

                return {
                    success: true,
                    message: res.data.message,
                };
            } catch (err) {
                this.error = err?.response?.data?.message;
                return {
                    success: false,
                    message: this.error,
                };
            } finally {
                this.loading = false;
            }
        },

        async login({ username, password }) {
            this.loading = true;
            this.error = null;

            try {

                // make api call to login
                const logRes = await api.post("/api/auth/login", { username, password });



                // session was regenerated server-side → refresh CSRF token
                await initCsrf();

                // refresh auth state
                const res = await api.get("/api/auth/status");
                this.authentication = !!res.data.authentication;
                this.user = res.data.user || null;

                return {
                    success: true,
                    message: logRes.data.message,
                };
            } catch (err) {
                this.error = err?.response?.data?.message;
                return {
                    success: false,
                    message: this.error,
                };
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            this.loading = true;
            this.error = null;

            try {

                // make api call to logout
                const res = await api.post("/api/auth/logout");


                // clear local auth state
                this.authentication = false;
                this.user = null;

                // clear csrf cache 
                clearCsrf();

                //  re-init csrf for “logged-out browsing”
                await initCsrf();

                return {
                    success: true,
                    message: res.data.message,
                };
            } catch (err) {
                this.error = err?.response?.data?.message;
                return {
                    success: false,
                    message: this.error,
                };
            } finally {
                this.loading = false;
            }
        },

        async changePassword({ newPassword, confirmPassword }) {
            this.loading = true;
            this.error = null;

            try {

                // make api call to change forgotten password
                const res = await api.post("/api/auth/change-password", {
                    newPassword,
                    confirmPassword,
                });

                // backend destroyed session → reflect that locally
                this.authentication = false;
                this.user = null;

                // clear cached CSRF token (session changed)
                clearCsrf();

                // re-init CSRF for logged-out state
                await initCsrf();

                return {
                    success: true,
                    message: res.data.message,
                };
            } catch (err) {
                this.error = err?.response?.data?.message;
                return {
                    success: false,
                    message: this.error,
                };
            } finally {
                this.loading = false;
            }
        }
    },
});