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

            <div class="body" v-for="user in allUsers" :key="user._id">
                <div class="userInfos" >
                    <h2>{{user.pseudo}}</h2>
                    <h3>{{user.createdAt}}</h3>
                </div>
                <div class="options">
                    <router-link :to="{ name:'User', params: {id: user._id} }" class="btn btn-primary">Suivre</router-link>
                    <router-link :to="{ name:'User', params: {id: user._id} }" class="btn btn-primary" @click="deleteCount">Supprimer</router-link>
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
        async deleteCount(){
            try {
                // Récupération de l'id depuis l'URL 
                let Id = this.$route.params.id; 
                console.log("test Id", Id); 

                // Appel à l'Api
            await axios.delete(`http://localhost:3000/api/user/${Id}`)
            .then(() => {
                console.log("compte supprimé")
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
    padding: 20px; 
    border-radius: 15px; 

    /* disposition  */
    display: flex;
    justify-content: space-between; 
    align-items: flex-start
}

.userInfos{
    display: flex; 
    gap: 30px;
    align-items: flex-end;
}

.userInfos h3{
    font-size: 12px; 
}

.options {
    display: flex;
    gap: 15px; 
    align-items: flex-start;
}
</style>
