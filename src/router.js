import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import RestaurantPage from "./pages/RestaurantPage.vue";
import NotFound from "./pages/NotFound.vue";
import Checkout from "./pages/Checkout.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/",
            name: "home",
            component: HomePage
        },
        {
            path: "/restaurant/:id",
            name: "SinglePage",
            component: RestaurantPage
        },
        {
            path: "/checkout",
            name: "Checkout",
            component: Checkout
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notFound",
            component: NotFound
        }
    ],
})

export { router };