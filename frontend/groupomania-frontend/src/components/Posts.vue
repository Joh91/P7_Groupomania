<template >
    <div class = "Post-body" >
        <div class="head-post">
            <div class = "head-post-title">
                <!-- <h3 >{{ postsInfos.user.pseudo}}</h3> -->
                <h4>{{ postsInfos.createdAt}}</h4> 
            </div>
            <!-- nav: modifier / supprimer -->
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-gear"></i>
                </button>
                <ul class="dropdown-menu">
                    <li><router-link :to="{ name:'Post', params: {id: postsInfos._id} }" class="dropdown-item" @click="switchToModify">Modifier</router-link></li>
                    <li><router-link :to="{ name:'Post', params: {id: postsInfos._id} }" class="dropdown-item" @click="switchToDelete">Supprimer</router-link></li>
                </ul>
            </div>
        </div>

        <!-- corps du post: message + image -->
        <div class="card" v-if="mode == 'post'">
            <div v-if="postsInfos.file">
                <img class= "post-img" :src= "postsInfos.file" alt=""/>
                <div class="card-body">
                    <p class="card-text"> {{ postsInfos.message }}</p>
                    <div class="foot">
                        <router-link :to="{ name:'Post', params: {id: postsInfos._id} }" class="dropdown-item" @click="getLiked">
                            <i class="fa-solid fa-thumbs-up"></i>
                        </router-link>
                        <span class="like">{{ postsInfos.like }}</span>
                    </div>
                </div>
            </div>
            <div v-else> 
                <!-- corps du post: message -->
                <div class="card">
                    <div class="card-body">
                        <p class="card-text"> {{ postsInfos.message }}</p>
                        <div class="foot">
                            <router-link :to="{ name:'Post', params: {id: postsInfos._id} }" class="dropdown-item" @click="getLiked">
                                <i class="fa-solid fa-thumbs-up"></i>
                            </router-link>
                            <span class="like">{{ postsInfos.like }}</span>
                        </div>
                    </div>
                </div> 
            </div>
        </div>

        <!-- corps du post en cas de modification -->
        <div class="card" v-if="mode == 'modify'">
            <form class="create-post" @submit="modifyPost()">
                <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea  type="text" class="form-control" id="message" style= "height: 130px" v-model="message"></textarea>
                </div>
                <div class="mb-3">
                    <label for="selectfile" class="form-label">Ajout d'un fichier (JPG, JPEG, PNG, GIF)</label>
                    <input class="form-control" type="file" id="selectfile" @change="newFile" ref="file">
                </div>
                
                <button type="submit" class="btn btn-primary" @click="returnToHome()">Annuler</button>
                <button type="submit" class="btn btn-primary">Modifier</button>
            </form>
        </div>

        <!-- corps du post en cas de suppression -->
        <div class="card" v-if="mode == 'delete'">
            <form @submit="deletePost()">
                <p>Voulez-vous vraiment supprimer ce post ?</p>
                <button type="submit" class="btn btn-primary" @click="returnToHome()">Annuler</button>
                <button type="submit" class="btn btn-primary">Supprimer</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default({
    name: "Posts", 
    props: ["postsInfos", ], 
    data(){
        return {
            mode: "post", 
            message: '', 
            file: null,
        }
    },  
    methods: {
        // Déclanche la personnalisation du post pour la fonction modification 
        switchToModify(){
            this.mode = "modify"
        }, 

        // Déclanche la personnalisation du post pour la fonction de suppression
        switchToDelete(){
            this.mode = "delete"
        },

        // Redirection vers la homepage 
        returnToHome(){
            this.$router.push('/home')
        }, 

        // Chargement d'un fichier depuis input-file 
        newFile(){
            console.log("testtest", this.$refs) 
            this.file = this.$refs.file.files[0];
            
            console.log(this.file)
        },

        // requête Put -- Modifier un post 
       async modifyPost(){
            try {
                // Récupération de l'id depuis l'URL 
                let Id = this.$route.params.id; 
                console.log("test Id", Id); 

                // Creation de du Fomr-Data à retourner
                let newData = new FormData();
                newData.append("message", this.message);
                newData.append("image", this.file);

                // Appel à l'api
                if( this.message != ""){
                     await axios.put(`http://localhost:3000/api/posts/${Id}`, newData)
                    .then((response) => {
                        console.log("test1", response)
                        console.log("test data", newData)
                        console.log("post modifié")
                    })
                } 

            } catch (error) { 
                console.log(error)
            }
        },

        // requête Delete -- Supprimer un post
       async deletePost(){
            try {
                // Récupération de l'id depuis l'URL 
                let Id = this.$route.params.id; 
                console.log("test Id", Id); 

                // Appel à l'Api
               await axios.delete(`http://localhost:3000/api/posts/${Id}`)
               .then(() => {
                console.log("post supprimé")
               })
            } catch (error){
                console.log(error)
            }
        },

        async getLiked(){
             try {
                // Récupération de l'id depuis l'URL 
                let Id = this.$route.params.id; 
                console.log("test Id", Id); 

                // Appel à l'Api
               await axios.post(`http://localhost:3000/api/posts/like/${Id}`)
               .then(() => {
                this.returnToHome();
                console.log("post liké")
               })
            } catch (error){
                console.log(error)
            }
        }
    }, 
})
</script>

<style scoped>

/* personnalisation du header du post */
.head-post {
    display: flex; 
    gap: 15px; 
    justify-content: space-between;
    margin: 40px 0 0;
    padding: 15px 30px 10px; 
    border-radius: 15px 15px 0 0;
    background-color: #faebeb;
    font-size: 20px;
    font-weight: bold;
}
.head-post h3 {
    font-size: 20px;
    font-weight: bold;
}
.head-post h4 {
    font-size: 12px; 
}

.dropdown-toggle {
    font-size: 12px;
    background: #4E5166;
}

/* personnalisation du corps du post */
.card-body {
    border: none
}

.post-img {
    height: 300px; 
    width: 100%; 
    object-fit: cover;
}

/* Personnalisation du footer du Post */
/* icône like */
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


