import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue";
import User from "@/views/User.vue";
import Test from "@/views/Test.vue";
import ProjectView from "@/views/ProjectView.vue";
import Login from "@/views/Login.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/search", component: Search },
        { path: "/user", component: User },
        { path: "/newthing", component: Test },
        {
            path: "/project/:author/:project",
            name: "project",
            component: ProjectView,
        },
        { path: "/login", component: Login },
    ],
});

export default router;
