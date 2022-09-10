<template>
    <section class="get-post">
        <!-- header -->
            <div class="head">
                <div class="title">
                    <h2>Informations Utilisateurs</h2>
                    <div>
                        <router-link to="/home"><i class="fa-solid fa-house"></i></router-link>
                    </div>
                    
                </div>
            </div>

            <div class="body"  v-for="user in allUsers" :key="user._id">
                    <div class="userInfos">
                        <h2>{{user.pseudo}}</h2>
                        <h3>Membre depuis le:  &nbsp; {{user.createdAt}}</h3>
                    </div>
                    <div class="options" v-if="user._id !== userId">
                        <button class="btn btn-primary">Suivre</button>
                        <button class="btn btn-primary" @click="deleteCount(user)" v-if="isAdmin == 'true' ">Supprimer</button>
                    </div>
                </div>
    </section>
</template>

<script>
import axios from 'axios'
export default ({
    name: "UserSection", 
     data(){
        return {
            allUsers: [],
            isAdmin: localStorage.getItem('admin'),
            userId: localStorage.getItem('userId')
        }
    },

    async mounted(){
        try {
        // configuration du header et du token qui sera retourné lors des requêtes
        // requête Get --- récupération des posts
            await axios.get('http://localhost:3000/api/user')
            .then((response) => {
                for(const getUsers of response.data){
                    this.allUsers.push(getUsers)
                }
            })     
        }
        
        catch(error){
            console.log(error)
        }  
    }, 

    methods: {
        // requête Delete -- Supprimer un compte
        async deleteCount(user){
            try {
                // récupération de l'id depuis postsInfos 
                let Id = user._id 

                // Appel à l'Api
            await axios.delete(`http://localhost:3000/api/user/${Id}`)
            .then(() => {
                console.log("compte supprimé")
                window.location.reload()
            })
            } catch (error){
                console.log(error)
            }
        },
    }
})
</script>

<style scoped>
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
    color: #fff; 
    background: #4E5166; 
    padding: 10px; 
    border-radius: 50px; 
    cursor: pointer; 
}

.fa-house:hover {
    background: #FD2D01; 
}

.body{
    /* design */
    margin-top: 40px; 
    background: lightgrey; 
    padding: 0 20px 40px; 
    border-radius: 15px; 

    /* disposition  */
    display: flex;
    justify-content: space-between; 
    align-items: flex-start
}

.userInfos h3{
    font-size: 12px; 
}

.options {
    display: flex;
    gap: 15px; 
    align-self: flex-end;
}

.user {
    display: none;
    padding: 0; 
    margin: 0; 
}

@media screen and (max-width: 700px) {
    .get-post {
        padding: 50px 20px; 
    }
}

@media screen and (max-width: 500px) {
    .body{
        display: flex; 
        flex-direction: column;
    }

    .userInfos {
        padding: 0
    }
}

@media screen and (max-width: 400px) {
   .get-post h2 {
        font-size: 16px;
    }

    .fa-house {
        font-size: 12px; 
        padding: 6px
    }

    .btn {
        font-size: 14px; 
        padding: 6px 8px; 
    }

}


</style>
