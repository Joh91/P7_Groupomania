<template>
    <section class="get-post">
            <h2>Derniers posts publiés</h2>

            <div class= "post">
                <div class="head">
                    <h3>Thomas 35</h3>
                    <h4>Publié il y a 2h</h4>
                </div>
                <div class="card">
                    <img class= "post-img" src="https://media.istockphoto.com/photos/overhead-view-of-a-chinese-new-year-reunion-dinner-activity-picture-id1288747002?b=1&k=20&m=1288747002&s=170667a&w=0&h=JCmT1TlO_NmTVrSfuGa0_h5IBDQ9KDgmd5559VxyWa8=" alt=""/>
                    <div class="card-body">
                        <p class="card-text">Superbe réunion culinaire avec l'équipe de Shanghai</p>
                        <ul>
                            <li>Like</li>
                            <li>modifier</li>
                            <li>supprimer</li>
                        </ul>
                        <!-- <div class="foot">
                            <i class="fa-solid fa-thumbs-up"></i>
                        </div> -->
                    </div>
                </div>   
            </div> 
    </section>
</template>

<script>

export default ({
    name: "PostSection"
})
</script>

<style scoped>
.get-post {
    background: white; 
    padding: 50px; 
    margin-top: 80px; 
    border-radius: 15px; 
    width: 90%; 
}

.get-post h2 {
    font-size: 24px;
    font-weight: bold;
    color:#FD2D01;
}

.head {
    display: flex; 
    gap: 15px; 
    justify-content: space-between;
    margin: 40px 0 0;
    padding: 10px; 
    border-radius: 15px 15px 0 0;
    background-color: #faebeb;
}

.head h3 {
    font-size: 20px;
    font-weight: bold;
}

.head h4 {
    font-size: 12px; 
}

.post-img {
    height: 300px; 
    width: 100%; 
    object-fit: cover;
}

ul {
    list-style-type: none; 
    display: flex; 
    gap: 20px; 
    font-weight: bold;
}


</style>