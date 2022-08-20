import { createRouter, createWebHistory } from 'vue-router'; 
import Accueil from "@/views/Accueil.vue"
import Page1 from "@/views/Page1.vue"
import Page2 from "@/views/Page2.vue"



const routes = [
    {name: 'Accueil', path: '/', component: Accueil},
    {name: 'Page1', path: '/page1', component: Page1},
    {name: 'Page2', path: '/page2', component: Page2},
];

const router = createRouter ({
    history: createWebHistory(), 
    routes,
});


export default router; 



