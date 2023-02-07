import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: () => import("@/views/Home.vue") },
    { path: "/add", name: "Add", component: () => import("@/views/Add.vue") },
    {
      path: "/favorite",
      name: "Favorite",
      component: () => import("@/views/Favorite.vue"),
    },
  ],
});
