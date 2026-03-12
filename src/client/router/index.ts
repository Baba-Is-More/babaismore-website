import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue";
import User from "@/views/User.vue";
import Test from "@/views/Test.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/search", component: Search },
    { path: "/user", component: User },
    { path: "/newthing", component: Test },
  ],
});

export default router;
