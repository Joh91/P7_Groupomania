// importations de nos views 
import { createRouter, createWebHistory } from 'vue-router'; 
import Connexion from "@/views/Connexion.vue"
import Homepage from "@/views/Homepage.vue"
import Profil from "@/views/Profil.vue"
import UsersPage from "@/views/UsersPage.vue"



// définition du chemin 
const routes = [
    {name: 'Connexion', path: '/', component: Connexion},
    {name: 'Homepage', path: '/home', component: Homepage }, 
    {name: 'Post', path: '/home/:id', component: Homepage, props: true}, 
    {name: 'Profil', path: '/profil/:id', component: Profil},
    {name: 'Users', path: '/users', component: UsersPage}, 

];

const router = createRouter ({
    history: createWebHistory(), 
    routes,
});


export default router; 



