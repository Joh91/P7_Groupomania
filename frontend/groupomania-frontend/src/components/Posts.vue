<template >
    <div class = "post-body" >
        <div class="head-post">
            <div class = "head-post-title">
                <!-- <h3>{{ postsInfos.user.pseudo }}</h3> -->
                <!-- <h4>{{ postsInfos.createdAt}}</h4>  -->
            </div>
            <!-- nav: modifier / supprimer -->
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-gear"></i>
                </button>
                <ul class="dropdown-menu" >
                    <!-- <li><router-link :to="{ name:'Post', params: {id: postsInfos._id} }" class="dropdown-item" @click="switchToModify(postsInfos)">Modifier</router-link></li> -->
                    <li><button class="dropdown-item" @click="switchToModify(postsInfos)">Modifier</button></li>
                    <li><button class="dropdown-item" @click="switchToDelete(postsInfos)">Supprimer</button></li>
                </ul>
            </div>
        </div>

        <!-- corps du post -->
        <div class="card" v-if="mode == 'post'">
            <div>
                <img class= "post-img" :src= "postsInfos.file" v-if="postsInfos.file">
                <div class="card-body">
                    <p class="card-text"> {{ postsInfos.message }}</p>
                    <div class="foot">
                         <button class="dropdown-item" @click="getLiked(postsInfos)">
                            <i class="fa-solid fa-thumbs-up unliked" v-if="like == ''"></i>
                            <i class="fa-solid fa-thumbs-up liked" v-else></i>
                        </button>
                        <span class="like">{{ postsInfos.like }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- corps du post en cas de modification -->
        <div class="card" v-if="mode == 'modify'">
            <form class="create-post" >
                <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea  type="text" class="form-control" id="message" v-model="message"></textarea>
                </div>
                <div class="mb-3">
                    <label for="selectfile" class="form-label">Ajout d'un fichier (JPG, JPEG, PNG, GIF)</label>
                    <input class="form-control" type="file" id="selectfile" @change="newFile" ref="file">
                </div>
                <div class="btn-position">
                    <button type="submit" class="btn btn-primary" @click="refresh()">Annuler</button>
                    <button type="submit" class="btn btn-primary" @click="modifyPost(postsInfos)">Modifier</button>
                </div>
            </form>
        </div>

        <!-- corps du post en cas de suppression -->
        <div class="card" v-if="mode == 'delete'">
            <form class="create-post">
                <p class="form-delete-msg" >Voulez-vous vraiment supprimer ce post ?</p>
                <div class="btn-position"> 
                    <button type="submit" class="btn btn-primary" @click="refresh()">Annuler</button>
                    <button type="submit" class="btn btn-primary btn-delete" @click="deletePost(postsInfos)">Supprimer</button>
                </div>
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
            like: "", 
        }
    }, 
    
    methods: {
        // D??clanche la personnalisation du post pour la fonction modification 
        switchToModify(){
            this.mode = "modify"
        }, 

        // D??clanche la personnalisation du post pour la fonction de suppression
        switchToDelete(){
            this.mode = "delete"
        },
        // Retour ?? la page d'accueil 
        returnToHome(){
            this.$router.push('/home')
        },

        // refresh page 
        refresh(){
            window.location.reload()
        }, 

        // Chargement d'un fichier depuis input-file 
        newFile(){
            console.log("testtest", this.$refs) 
            this.file = this.$refs.file.files[0];
            
            console.log(this.file)
        },

        // requ??te Put -- Modifier un post 
       async modifyPost(postsInfos){
            try {
            
                // r??cup??ration de l'id depuis postsInfos 
                let Id = postsInfos._id

                // Creation de du Form-Data ?? retourner
                let newData = new FormData();
                newData.append("message", this.message);
                newData.append("image", this.file);

                // Appel ?? l'api
                if( this.message != ""){
                     await axios.put(`http://localhost:3000/api/posts/${Id}`, newData)
                    .then((response) => {
                        console.log("test1", response)
                        console.log("test data", newData)
                        console.log("post modifi??")
                    })
                } 

            } catch (error) { 
                console.log(error)
            }
        },

        // requ??te Delete -- Supprimer un post
       async deletePost(postsInfos){
            try {
                // r??cup??ration de l'id depuis postsInfos 
                let Id = postsInfos._id

                // Appel ?? l'Api
               await axios.delete(`http://localhost:3000/api/posts/${Id}`)
               .then(() => {
                console.log("post supprim??")
               })
            } catch (error){
                console.log(error)
            }
        },

        // requ??te Like 
        async getLiked(postsInfos){
             try {
                // r??cup??ration de l'id depuis postsInfos 
                let Id = postsInfos._id

                // D??finition de l'objet 
                const userId = localStorage.getItem('userId');
                let data = { userId: userId }

                // Appel ?? l'Api
               await axios.post(`http://localhost:3000/api/posts/like/${Id}`, data)
               .then(() => {
                this.like = "";
                console.log("post lik??")
                
               })
            } catch (error){
                console.log(error)
            }
        },

        // requ??te unlike
        // async getUnlike(){
        //      try {
        //         R??cup??ration de l'id depuis l'URL 
        //         let Id = this.$route.params.id; 
        //         console.log("test Id", Id); 

        //         D??finition de l'objet 
        //         const userId = localStorage.getItem('userId');
        //         let data = {
        //             userId: userId
        //         }
        //         console.log("data", data)

        //         Appel ?? l'Api
        //        await axios.post(`http://localhost:3000/api/posts/unlike/${Id}`, data)
        //        .then(() => {
        //         this.liked = "";
        //         console.log("like supprim??")
                
        //        })
        //     } catch (error){
        //         console.log(error)
        //     }
        // }
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
    height: 250px; 
    width: 100%; 
    object-fit: cover;
}

.create-post {
    padding: 20px; 
}

.btn-position {
    display: flex; 
    gap: 20px; 
}

.form-delete-msg{
    font-weight: bold;
}

.btn-delete {
    background: #FD2D01;
    font-size: 16px; 
}

/* Personnalisation du footer du Post */
/* ic??ne like */
.unliked {
    font-size: 25px;
    color: #4E5166; 
}
.liked {
    font-size: 25px; 
    color: #FD2D01; 
}

.foot {
    display: flex; 
    align-items: flex-end;
    padding-top: 10px; 
    gap: 10px; 
    border-top: 1px solid lightgrey; 
}

@media screen and (max-width: 550px) {
    .head-post {
    padding: 15px 15px 10px; 
    }

    .dropdown-toggle {
        padding: 5px 7px; 
    }
}

@media screen and (max-width: 450px) {
    .head-post-title h3{
        font-size: 16px; 
    }

    .post-img {
        height: 180px; 
    }

    .card-body {
        padding: 10px; 
        font-size: 14px; 
    }

    .fa-thumbs-up{
        font-size: 16px; 
    }

    .form-label, .form-control {
        font-size: 14px;
    }

    textarea {
        height: 20px; 
    }
}
</style>


