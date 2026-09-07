import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue";
import User from "@/views/User.vue";
import Test from "@/views/Test.vue";
import ProjectView from "@/views/project/View.vue";
import Login from "@/views/auths/Login.vue";
import Logout from "@/views/auths/Logout.vue";
import Signup from "@/views/auths/Signup.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/search", component: Search },
        { path: "/user/:username", name: "user", component: User },
        { path: "/newthing", component: Test },
        {
            path: "/project/:author/:project",
            name: "project",
            component: ProjectView,
        },
        { path: "/login", component: Login },
        { path: "/logout", component: Logout },
        { path: "/signup", component: Signup },
    ],
});

export default router;
