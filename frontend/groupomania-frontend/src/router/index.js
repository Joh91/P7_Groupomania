// importations de nos views 
import { createRouter, createWebHistory } from 'vue-router'; 
import Connexion from "@/views/Connexion.vue"
import Homepage from "@/views/Homepage.vue"



// définition du chemin 
const routes = [
    {name: 'Connexion', path: '/', component: Connexion},
    {name: 'Homepage', path: '/home', component: Homepage }
];

const router = createRouter ({
    history: createWebHistory(), 
    routes,
});


export default router; 



