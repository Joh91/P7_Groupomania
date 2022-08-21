// importations de nos views 
import { createRouter, createWebHistory } from 'vue-router'; 
import Connexion from "@/views/Connexion.vue"



// définition du chemin 
const routes = [
    {name: 'Connexion', path: '/', component: Connexion},
];

const router = createRouter ({
    history: createWebHistory(), 
    routes,
});


export default router; 



