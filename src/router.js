import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import CategoryPage from "./pages/CategoryPage.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/",
            name: "home",
            component: HomePage
        },
        {
            path: "/category/:name",
            name: "singlePage",
            component: CategoryPage
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notFound",
            component: NotFound
        }
    ],
})

export { router };