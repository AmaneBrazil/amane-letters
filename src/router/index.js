import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import LetterView from '../pages/LetterView.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/view/:id',
            component: LetterView
        }
    ]
});