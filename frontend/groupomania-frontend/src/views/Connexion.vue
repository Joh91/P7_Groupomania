<template>
    <div class="content"> 
        <img src= "@/assets/icon-left-font-monochrome-white.png" alt="logo de groupomania"/>
        <main class="main-connexion">
            <!-- retourne ce titre si Login -->
            <h1 v-if="mode == 'login'">Connexion</h1>
            <!-- sinon retourne ce titre si inscription -->
            <h1 v-else>Inscription</h1>
            <div v-if="mode == 'login'">
                <p class="nav-connexion">
                    Vous n'avez pas de compte ?
                    <span class='signUp' @click="switchToCreateAccount()">Inscrivez-vous</span>
                </p>
                <FormLogin/>
            </div>
            <div v-else>
                <p class="nav-connexion">
                    Vous avez déjà un compte ?
                    <span class='signUp' @click="switchToLogin()">Connectez-vous</span>
                </p>
                <FormCreate/>
            </div>   
        </main>
    </div>
</template>

<script>

import FormLogin from '@/components/Form-login.vue'
import FormCreate from '@/components/Form-create.vue'



export default ({
    name: "Connexion", 
    data: function (){
        return {
            mode: 'login',
        }
    },
    methods: {
        //Deux fonctions permettant de charger la page Login ou Inscription selon le lien suivi
        switchToCreateAccount: function(){
            this.mode = 'create'
        },
        switchToLogin: function(){
            this.mode = 'login'
        }
    },
    components: {
        FormLogin, 
        FormCreate
    }
})
</script>

<style>
    /* personnalisation de l'arrière-plan et disposition */
   body {
        background: linear-gradient(356deg, rgba(255,215,215,1) 0%, rgba(253,45,1,0.5914740896358543) 92%);
        background-repeat: no-repeat;
        background-attachment: fixed;
        margin: auto;  
    }

    /* disposition des éléments */
    .content {
        display: flex; 
        flex-direction: column;
        align-items: center;
    }

    /* image */
    img {
        width: 350px; 
    }

    /* Personnalisation du coprs de texte */
    .main-connexion {
        background: #fff;
        display: flex; 
        flex-direction: column;
        align-items: center; 
        padding: 50px 40px; 
        margin-bottom: 100px; 
        border-radius: 40px; 
    }

    h1 {
         color: #FD2D01;
        margin-bottom: 20px; 
        font-size: 26px;
        font-weight: bold;
    }

    .signUp {
        color: #FD2D01; 
        text-decoration: underline;
        cursor: pointer;
    }

    .nav-connexion {
        text-align: center;
    }

    /* personnalisation des composants */
    .form-login{
        width: 700px; 
    }

    label, button {
        font-weight: bold;
    }

    input {
        border-color: #4E5166
    }

    .btn {
        background-color: #4E5166; 
        border-color: #4E5166;
        margin-top: 20px; 
    }

    .btn:hover{
        background: #FD2D01; 
        border-color: #FD2D01; 
    }

    /* gestion des Medias queries */
    @media screen and (max-width: 850px) {
        .main-connexion{
            width: 80%; 
        }

        .form-login {
            width: 100%; 
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

     @media screen and (max-width: 420px) {
        .main-connexion{
            width: 90%; 
        }

        img {
            width: 250px; 
        }

        label{
            display: flex; 
            justify-content: center;
        }

        .nav-connexion {
            margin-bottom: 30px;
        }

        .form-login {
            width: 100%; 
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

</style>