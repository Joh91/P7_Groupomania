<template>
    <section class="get-post">
        <!-- header -->
            <div class="head">
                <div class="head-title">
                    <h2>Bonjour  {{userInfo.pseudo}}</h2>
                    <h3>Voici les derniers posts publiés: </h3>
                </div>
            </div>

            <!-- en-tête du post -->
            <div v-if="allPosts != null"> 
                    <!-- v-for retourne les informations "post" pour chaque posts générés-->
                    <!-- Déclaration de la props "postsInfos" pour retourner les données au composant "Posts"-->
                    <posts v-for="post in allPosts" :key="post._id" :postsInfos="post">
                    </posts>
            </div>
    </section>
</template>

<script>
import axios from 'axios'
import Posts from "@/components/Posts.vue"
import { ref } from 'vue'
export default ({
    name: "PostSection", 
    data(){
        return {
            allPosts: ref([]),
            userInfo: "", 
            message: "", 
            file: null,
        }
    },
    created(){
        try {
            // récupération de l'userId auprès du localstorage nécessaire pour notre requête
            const Id = localStorage.getItem('userId');

            // requête Get avec Id pour récupérer les infos utilisateurs
            axios.get(`http://localhost:3000/api/user/${Id}`)
            .then((res) => {
                this.userInfo = res.data;   
            })  
           
        }
         catch(error){
            console.log(error)
         }

    }, 

    mounted(){
        try {
        // requête Get --- récupération des posts
            axios.get('http://localhost:3000/api/posts')
            .then((response) => {
                for(const getPosts of response.data){
                    this.allPosts.push(getPosts); 
                }
                
            })  
        }
        
        catch(error){
            console.log(error)
        }   
    }, 
    
    
    components : {
        "posts" : Posts
    }
})
</script>

<style scoped>
.get-post {
    background: white; 
    padding: 50px; 
    margin: 60px auto; 
    border-radius: 15px; 
    width: 70%; 
}

.get-post h2 {
    display: flex; 
    margin: 0; 
    gap: 15px; 
    font-size: 20px;
    font-weight: bold;
    color: #4E5166;
    background: lightgrey; 
    padding: 20px; 
    border-radius: 15px;
}

.get-post h3 {
    font-size: 16px;
    font-weight: bold;
    padding: 25px 0;
}

@media screen and (max-width: 750px) {
    .get-post { 
        width: 90%; 
    }
}

@media screen and (max-width: 550px) {
    .get-post { 
        padding: 50px 20px; 
    }
}

</style>