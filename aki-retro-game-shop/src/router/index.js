import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores/auth";

import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { public: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { guestOnly: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guestOnly: true },
    }


  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  // check session status
  if (!auth.checked && !auth.loading) {
    await auth.status();
  }

  //  Block unauthenticated users from protected routes
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "login" };
  }

  //  Block authenticated users from login/register pages
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: "home" };
  }
});

export default router
