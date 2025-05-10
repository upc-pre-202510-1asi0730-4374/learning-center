import HomeComponent from "@/public/pages/home.component.vue";
import AboutComponent from "@/public/pages/about.component.vue";
import PageNotFoundComponent from "@/public/pages/page-not-found.component.vue";
import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {path: '/home', name: 'home', component: HomeComponent, meta: {title: 'Home'}},
    {path: '/about', name: 'about', component: AboutComponent, meta: {title: 'About'}},
    {path: '/', name: 'default', redirect: {name: 'home'}},
    {path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFoundComponent, meta: {title: '404 - Page Not Found'}}
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

export default router;