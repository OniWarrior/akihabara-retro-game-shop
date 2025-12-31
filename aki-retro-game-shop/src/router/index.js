import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import ProductsView from "../views/ProductsView.vue"; // when you create it

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },

    // Public products page
    {
      path: "/products",
      name: "products",
      component: ProductsView
    },

    // Guest-only
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { guestOnly: true }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guestOnly: true }
    },


  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  // Initialize auth once (loads CSRF + checks /status)
  if (!auth.initialized && !auth.loading) {
    await auth.init();
  }

  // Only applies if you add protected routes later
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  // Prevent logged-in users from visiting login/register
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: "products" }; // logged-in landing
  }

  return true;
});

export default router;