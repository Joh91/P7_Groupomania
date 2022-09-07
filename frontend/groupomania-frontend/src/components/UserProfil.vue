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
                    <h3>{{ allUsers.email }}</h3>
                </div>
                <div class="admin-control">
                    <button type="submit" class="btn btn-primary">Supprimer</button>
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
            allUsers: []
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
.get-post h3 {
    font-size: 18px;
    font-weight: bold;
}
.title {
    display: flex;
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
}

.fa-house{
    color: #4E5166; 
    cursor: pointer; 
}

.fa-house:hover {
    color: #FD2D01; 
}
</style>
