import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "Home", component: () => import("@/views/Home.vue") },
    { path: "/add", name: "Add", component: () => import("@/views/Add.vue") },
  ],
});
