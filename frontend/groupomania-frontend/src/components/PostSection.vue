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

            <div class= "post">
                <div class="head-post">
                    <div class = "head-post-title">
                        <h3>Thomas 35</h3>
                        <h4>Publié il y a 2h</h4>
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
                <div class="card">
                    <img class= "post-img" src="https://media.istockphoto.com/photos/overhead-view-of-a-chinese-new-year-reunion-dinner-activity-picture-id1288747002?b=1&k=20&m=1288747002&s=170667a&w=0&h=JCmT1TlO_NmTVrSfuGa0_h5IBDQ9KDgmd5559VxyWa8=" alt=""/>
                    <div class="card-body">
                        <p class="card-text">Superbe réunion culinaire avec l'équipe de Shanghai</p>
                        <div class="foot">
                            <i class="fa-solid fa-thumbs-up" ></i>
                            <button @click="getPosts">click</button>
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
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: 'Bearer ' + token};

            axios.get('http://localhost:3000/api/posts', {headers} )
            .then((response) => {
                console.log(response); 
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


</style>