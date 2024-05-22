import { defineStore } from "pinia";
import { ref } from "vue";


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