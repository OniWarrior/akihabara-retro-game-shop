/*
 * Author : Stephen Aranda
 * File   : OrderStore.js
 * Desc   : order store for any orders made by the Customer user type
 */

import { defineStore } from "pinia";
import api from "@/api/client";
import { useAuthStore } from "@/stores/auth";

export const useOrdersStore = defineStore("orders", {
    state: () => ({
        items: [],               // items of past orders 
        loading: false,          // loading prior to api call
        error: null,
        initialized: false,
    }),

    actions: {

        // buyProduct: buy an item api call for customer usertype
        async buyProduct(product_id, quantity) {
            const auth = useAuthStore();

            // protect against other user types
            if (!auth.isCustomer) {
                this.error = "Only customers can purchase items.";
                return { success: false, message: this.error };
            }

            this.loading = true;
            this.error = null;

            try {

                // make api call to buy a product
                const res = await api.post(`/api/user/buy-product/${product_id}/${quantity}`);

                // return success message
                return { success: true, message: res.data };
            } catch (err) { // failure message assigned
                this.error = err?.response?.data?.message;
                return { success: false, message: this.error };
            } finally {
                this.loading = false;
            }
        },

        // fetchPastOrders: fetch past orders of a customer
        async fetchPastOrders({ force = false } = {}) {
            const auth = useAuthStore();

            // protect against other usertypes.
            if (!auth.isCustomer) {
                this.error = "Only customers can view past orders.";
                return [];
            }

            // prevent unnecessary refetch
            if (!force && this.initialized) return this.items;

            this.loading = true;
            this.error = null;

            try {

                // make api call to get the past orders
                const res = await api.get("/api/user/get-past-orders");

                // assign them to props
                this.items = Array.isArray(res.data) ? res.data : [];
                this.initialized = true;
                return this.items;
            } catch (err) { // assign failure message.
                this.error = err?.response?.data?.message;
                this.items = [];
                this.initialized = false;
                return [];
            } finally {
                this.loading = false;
            }
        },

        // clear state object
        clear() {
            this.items = [];
            this.loading = false;
            this.error = null;
            this.initialized = false;
        },
    },
});