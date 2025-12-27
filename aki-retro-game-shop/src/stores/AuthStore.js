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

        async checkStatus() {

            // start of api call

            // set loading and error to true and null
            this.loading = true;
            this.error = null;
        }

    }


})