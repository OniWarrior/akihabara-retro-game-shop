

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { attachCsrfInterceptors } from "@/lib/axios";
import { useCsrfStore } from "@/stores/csrf.store";

import App from './App.vue'
import router from './router'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const csrf = useCsrfStore(pinia);

attachCsrfInterceptors({
    getToken: () => csrf.token,
    refreshToken: () => csrf.fetchToken(true),
});

app.mount('#app')
