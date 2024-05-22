import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../router";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: ref({}),
        message: ref('')

    }),
    getters: {
        user: (state) => {
            return state.user
        }

    }


})