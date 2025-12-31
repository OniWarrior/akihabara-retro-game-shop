/*
 * Author : Stephen Aranda
 * File   : ProductStore.js
 * Desc   : store for products that are retrieved from the backend
 */

import { defineStore } from "pinia";
import { useAuthStore } from "./AuthStore";
import api from "@/api/client";

export const useProductsStore = defineStore("products", {
    state: () => ({
        items: [],        // array of products
        loading: false,   // is loading at the beginning of an api call
        error: null,      // message if api call fails
        initialized: false,
        lastFetchedAt: null,
    }),

    getters: {
        hasProducts: (state) => state.items.length > 0,
    },

    // action suite
    actions: {

        // fetch all the available current products from the backend
        async fetchAll({ force = false } = {}) {

            // basic cache: don't refetch if we already have data
            if (!force && this.initialized) return this.items;

            this.loading = true;
            this.error = null;

            try {

                // make the api call to get the products
                const res = await api.get("/api/product/products");


                this.items = Array.isArray(res.data) ? res.data : [];
                this.initialized = true;
                this.lastFetchedAt = Date.now();
                return this.items;
            } catch (err) { // failure assign error message.
                this.error = err?.response?.data?.message;
                this.items = [];
                this.initialized = false;
                return [];
            } finally {
                this.loading = false;
            }
        },

        // addProduct: manager action that allows the manager to add a product.
        async addProduct(productPayload) {
            const auth = useAuthStore();

            // check user role
            if (!auth.isManager) {
                this.error = "Only managers can add products.";
                return { success: false, message: this.error };
            }

            this.loading = true;
            this.error = null;

            try {

                // make api call to add a product to product inventory
                const res = await api.post("/api/user/add-product", productPayload);

                // refresh list since backend doesn't return the created product
                await this.fetchAll({ force: true });

                return { success: true, message: res.data?.message };
            } catch (err) {
                this.error = err?.response?.data?.message;
                return { success: false, message: this.error };
            } finally {
                this.loading = false;
            }
        },

        // clean the current state object.
        clear() {
            this.items = [];
            this.loading = false;
            this.error = null;
            this.initialized = false;
            this.lastFetchedAt = null;
        },
    },
});