<template>
    <section class="get-post">
        <!-- header -->
            <div class="head">
                <div class="title">
                    <h2>Bonjour (...)</h2>
                    <h3>Voici les derniers posts publiés</h3>
                </div>
            </div>

            <!-- en-tête du post -->
            <div v-if="allPosts != null"> 
                <div  v-for="post in allPosts" v-bind:key="post._id" class= "post">
                    <div class="head-post">
                        <div class = "head-post-title">
                            <h3 >{{ post.user.pseudo}}</h3>
                            <h4>{{ post.createAt }}</h4>
                        </div>

                        <!-- option post : modifier / supprimer -->
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-gear"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <!-- <li><a href="#" data-bs-toggle="modal" data-bs-target="#ModalModifyPost">Modifier</a></li> -->
                                <li><router-link :to="{ name:'Post', params: {id: post._id} }" class="dropdown-item" @click="switchToModify">Modifier</router-link></li>
                                <li><router-link :to="{ name:'Post', params: {id: post._id} }" class="dropdown-item" @click="deletePost">Supprimer</router-link></li>
                                <!-- <li><router-link class="dropdown-item" href="#">Supprimer</router-link></li> -->
                            </ul>
                        </div>
                    </div>

                    <!-- corps du post: message + image -->
                    <div class="card" v-if="mode == 'post'">
                        <div v-if="post.file">
                            <img class= "post-img" :src= "post.file" alt=""/>
                            <div class="card-body">
                                <p class="card-text"> {{ post.message }}</p>
                                <div class="foot">
                                    <i class="fa-solid fa-thumbs-up" ></i>
                                    <span class="like">{{ post.like }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-else> 
                            <!-- corps du post: message -->
                            <div class="card">
                                <div class="card-body">
                                    <p class="card-text"> {{ post.message }}</p>
                                    <div class="foot">
                                        <i class="fa-solid fa-thumbs-up" ></i>
                                        <span class="like">{{ post.like }}</span>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>

                    <div class="card" v-else>
                        <form class="create-post" @submit.prevent="modifyPost">
                            <div class="mb-3">
                                <label for="message" class="form-label">Message</label>
                                <textarea  type="text" class="form-control" id="message" style= "height: 130px" v-model="message"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="selectfile" class="form-label">Ajout d'un fichier (JPG, JPEG, PNG, GIF)</label>
                                <input class="form-control" type="file" id="selectfile" @change="newFile" ref="file">
                            </div>
                            <button type="submit" class="btn btn-primary">Modifier</button>
                        </form>
                    </div>
                </div> 
            </div>
    </section>
</template>

<script>
import axios from 'axios'

export default ({
    name: "PostSection", 
    data(){
        return {
            mode: "", 
            allPosts: null,
            message: "", 
            file: null,
            mode: "post"
        }
    },
    async mounted(){
        try {
        // configuration du header et du token qui sera retourné lors des requêtes
        // requête Get --- récupération des posts
            let getPost = await axios.get('http://localhost:3000/api/posts')
            this.allPosts = getPost.data;
                console.log("test2", allPosts)
                
        }
        
        catch(error){
            console.log(error)
        }   
    }, 
    methods: {
        switchToModify(){
            this.mode = "modify"
        }, 

           // ajout d'un fichier 
        newFile(){
            console.log("testtest", this.$refs) 
            this.file = this.$refs.file[0].files[0];
            
            console.log(this.file)
        },

        // requête Put -- Modifier un post 
       async modifyPost(){
            try {
                // Récupération de l'id depuis l'URL 
                let Id = this.$route.params.id; 
                console.log("test Id", Id); 

                let newData = new FormData();
                newData.append("message", this.message);
                newData.append("image", this.file);

                 await axios.put(`http://localhost:3000/api/posts/${Id}`, newData)
                .then((response) => {
                    console.log("test1", response)
                    console.log("test data", newData)
                    console.log("post modifié")
                })

            } catch (error) { 
                console.log(error)
            }
        },

       async deletePost(){
            try {
                // Récupération de l'id depuis l'URL 
                let Id = this.$route.params.id; 
                console.log("test Id", Id); 

               await axios.delete(`http://localhost:3000/api/posts/${Id}`)
               .then(() => {
                redirect: to => { return 'home'}
                console.log("post supprimé")
               })
            } catch (error){
                console.log(error)
            }
        }
    }, 
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

.add-post {
    display: flex; 
    gap: 15px; 
}

.add-post span {
    align-self: center;
    font-weight: bold;
    color: #4E5166; 

}

.btn-addPost {
    border: none;
    background: inherit;
}


.fa-pen-to-square {
    font-size: 20px; 
    border-radius: 50px; 
    padding: 10px; 
    background: #4E5166; 
    color: #fff; 
}

.fa-pen-to-square:hover  { 
    background: #FD2D01; 
    color: #fff; 
}

.head-post {
    display: flex; 
    gap: 15px; 
    justify-content: space-between;
    margin: 40px 0 0;
    padding: 15px 30px 10px; 
    border-radius: 15px 15px 0 0;
    background-color: #faebeb;
}

.head-post h3 {
    font-size: 20px;
    font-weight: bold;
}

.head-post h4 {
    font-size: 12px; 
}

.card-body {
    border: none
}

.dropdown-toggle {
    font-size: 12px;
    background: #4E5166;
}

.post-img {
    height: 300px; 
    width: 100%; 
    object-fit: cover;
}

.fa-thumbs-up  {
    font-size: 25px;
    color: #4E5166; 
}

.fa-thumbs-up:active {
    color: #FD2D01; 
}

.foot {
    display: flex; 
    align-items: flex-end;
    padding-top: 10px; 
    gap: 10px; 
    border-top: 1px solid lightgrey; 
}


</style>