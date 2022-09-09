<template>
    <section class="get-post">
        <!-- header -->
            <div class="head">
                <div class="title">
                    <h2>Informations de votre compte </h2>
                    <router-link to="/home"><i class="fa-solid fa-house"></i></router-link>
                </div>
            </div>

            <div class="body">
                <div class="userInfos" >
                    <h2>{{ allUsers.pseudo }}</h2>
                    <h3 class= "userInfos-title">Votre compte est actif depuis le :</h3> 
                    <h3 class="userInfos-content">{{ allUsers.createdAt}}</h3>
                    <h3 class="userInfos-title">Votre adresse mail:</h3> 
                    <h3 class="userInfos-content">{{ allUsers.email }}</h3>
                </div>
                <div class="profil-control" v-if="mode == 'info'">
                    <span>Supprimer mon compte</span>
                    <button type="submit" class="btn btn-primary btn-delete" @click="switchToDelete">Supprimer</button>
                </div>
                <div class="profil-control" v-else>
                    <form class="form-delete" @submit='deleteCount'>
                        <span>Attention cette procédure est définitive:</span>
                        <div class="button-direction">
                            <button type="submit" class="btn btn-primary btn-cancel" @click="cancel">Annuler</button>
                            <button type="submit" class="btn btn-primary btn-delete">Continuer</button>
                        </div>
                    </form>
                </div>
            </div>
    </section>
</template>

<script>
import axios from 'axios'
export default ({
    name: "UserProfil", 
    data(){
        return {
            allUsers: [], 
            mode: 'info'
        }
    },

     async mounted(){
        try {
        // configuration du header et du token qui sera retourné lors des requêtes
        // requête Get/Id --- récupération des infos de l'user
                            
            // Récupération de l'id depuis l'URL 
            let Id = this.$route.params.id;

            await axios.get(`http://localhost:3000/api/user/${Id}`)
            .then((response) => {
                console.log(response)
                this.allUsers = response.data
            })     
        }
        
        catch(error){
            console.log(error)
        }  
    }, 
    methods: {
        switchToDelete(){
            this.mode = 'delete'
        }, 

        cancel(){
            window.location.reload()
        }, 

        // requête Delete -- Supprimer un compte
        async deleteCount(){
            try {
                // Récupération de l'id depuis l'URL 
                let Id = this.$route.params.id; 
                console.log("test Id", Id); 

                // Appel à l'Api
            await axios.delete(`http://localhost:3000/api/user/${Id}`)
            .then(() => {
                console.log("compte supprimé")
                // redirection vers l'écran d'accueil
                 this.$router.push({name: "Connexion"})
            })
            } catch (error){
                console.log(error)
            }
        },
    }
})
</script>

<style>
.get-post {
    background: white; 
    padding: 50px; 
    margin: 60px auto; 
    border-radius: 15px; 
    width: 90%; 
}
.get-post h2 {
    font-size: 20px;
    font-weight: bold;
    color:#FD2D01;
}

.title {
    display: flex;
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
}

.fa-house{
    font-size: 20px; 
    color: #4E5166; 
    cursor: pointer; 
}

.fa-house:hover {
    color: #FD2D01; 
}

/* personnalisation du bloc informations */
.userInfos{
    margin: 30px 0; 
    background: lightgrey;
    padding: 15px; 
    border-radius: 15px; 
}

.userInfos-title {
    font-size: 18px;
    font-weight: bold;
    padding: 20px 0 5px
}

.userInfos-content {
    font-size: 16px; 
}

/* personnalisation du bloc control */
.profil-control{
    margin: 30px 0; 
    background: #FFD7D7;
    padding: 15px; 
    border-radius: 15px;
}

.profil-control{
    display: flex; 
    flex-direction: column;
}

.profil-control span {
    font-size: 20px; 
    font-weight: bold;
}

.btn-delete{
    width: 100px; 
    background: #FD2D01; 
    border: none
}

.btn-cancel:hover{
    background: rgb(48, 113, 235);
    border: none; 
}

.form-delete{
    background: #fff; 
    padding: 15px; 

}

.form-delete span {
    font-size: 18px; 
}

.button-direction {
    display: flex; 
    gap: 20px; 
}

@media screen and (max-width: 500px) {
    .get-post {
        padding: 50px 20px; 
    }

    .get-post h2 {
        font-size: 18px;
    }

    .userInfos h2 {
        font-size: 18px; 
    }

    .userInfos-title {
        font-size: 16px;
        padding-top: 10px;
    }

    .userInfos-content {
        font-size: 14px; 
    }

    .profil-control span {
        font-size: 16px; 
    }

    .btn-delete{
        font-size: 14px; 
    }
}
</style>
