<template>
    <section class="get-post">
        <!-- header -->
            <div class="head">
                <div class="title">
                    <h2>Bonjour ...</h2>
                    <h3>Voici les derniers posts publiés</h3>
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
            message: "", 
            file: null,
        }
    },

    async mounted(){
        try {
        // configuration du header et du token qui sera retourné lors des requêtes
        // requête Get --- récupération des posts
            await axios.get('http://localhost:3000/api/posts')
            .then((response) => {
                for(const getPosts of response.data){
                    this.allPosts.push(getPosts)
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
.head {
    display: flex; 
    justify-content: space-between;
    align-items: center;
}

</style>