<template>
    <section class="get-post">
            <div class="head">
                <div class="title">
                    <h2>Bonjour (...)</h2>
                    <h3>Voici les derniers posts publiés</h3>
                </div>
                <div class= "add-post">
                    <span>Ajouter un post</span>
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
            </div>

            <div v-bind:key="index" v-for="(post, index) in allPosts" class= "post">
                <div class="head-post">
                    <div class = "head-post-title">
                        <h3>{{ post.pseudo }}</h3>
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
export default ({
    name: "PostSection", 
    data(){
        return {
            allPosts: []
        }
    }, 
        created(){
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
    gap: 20px; 
}

.add-post span {
    align-self: center;
    font-weight: bold;
    color: #4E5166; 

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