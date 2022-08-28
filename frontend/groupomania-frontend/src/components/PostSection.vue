<template>
    <section class="get-post">
            <div class="head">
                <div class="title">
                    <h2>Bonjour (...)</h2>
                    <h3>Voici les derniers posts publiés</h3>
                </div>
                <div class= "add-post">
                    <span>Ajouter un post</span>
                    <!-- modal -->
                     <div class="modal fade" id="ModalCreatePost" tabindex="-1" aria-labelledby="ModalCreatePost" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="ModalCreatePost">Ajouter un post</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div class="modal-body">
                                    <form class="create-post">
                                        <div class="mb-3">
                                            <label for="message" class="form-label">Message</label>
                                            <textarea  type="password" class="form-control" id="password" style= "height: 130px" v-model="postData.message"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label for="formFile" class="form-label">Ajout d'un fichier (JPG, JPEG, PNG, GIF)</label>
                                            <input class="form-control" type="file" id="formFile" @click="addFile">
                                        </div>
                                    </form>
                                </div>
                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                    <button type="button" class="btn btn-primary" @click="addPost">Envoyer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn-addPost" data-bs-toggle="modal" data-bs-target="#ModalCreatePost">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>   
                </div>
            </div>

            <div v-bind:key="index" v-for="(post, index) in allPosts" class= "post">
                <div class="head-post">
                    <div class = "head-post-title">
                        <h3 >{{ post.userId }}</h3>
                        <h4>{{ post.createAt }}</h4>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Modifier</a></li>
                            <li><a class="dropdown-item" href="#">Supprimer</a></li>
                        </ul>
                    </div>
                </div>
                <div class="card" v-if="post.imageUrl">
                    <img class= "post-img" src= "{{ post.imageUrl }}" alt=""/>
                    <div class="card-body">
                        <p class="card-text"> {{ post.message }}</p>
                        <div class="foot">
                            <i class="fa-solid fa-thumbs-up" ></i>
                            <span class="like">{{ post.like }}</span>
                        </div>
                    </div>
                </div>

                <div class="card" v-else>
                    <div class="card-body">
                        <p class="card-text"> {{ post.message }}</p>
                        <div class="foot">
                            <i class="fa-solid fa-thumbs-up" ></i>
                            <span class="like">{{ post.like }}</span>
                        </div>
                    </div>
                </div>   
            </div> 
    </section>
</template>

<script>
import axios from 'axios'
import ModalCreatePost from '@/components/ModalCreatePost.vue'
export default ({
    name: "PostSection", 
    data(){
        return {
            allPosts: [],
            postData: {
                message: '',
                fichier: null,
            }
            
        }
    },created(){
        // configuration du header et du token qui sera retourné lors des requêtes
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: 'Bearer ' + token};

        // requête Get --- récupération des posts
        axios.get('http://localhost:3000/api/posts', {headers} )
        .then((response) => {
            console.log(response); 
            for(const posts of response.data){
                this.allPosts.push(posts)
            }
            console.log(allPosts)
        })
        .catch((error) => {
            console.log(error)
        }) 

        // requête Post --- Créer un post 
        
    }, 
    methods: {
        addPost(){
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token};
            axios.post("http://localhost:3000/api/posts", {headers},  this.postData.message, this.postData.fichier, )
            .then((response) => {
                console.log(headers)
                this.$router.push('/home');
            })
            .catch((error) => {
                console.log(error)
            })   
        },

        addFile(){
            this.fichier = this.$refs.file.files[0]; 
        }
    }, 
    
    components : {
        ModalCreatePost
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