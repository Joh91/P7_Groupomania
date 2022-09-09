<template>
    <header> 
        <nav>
            <div>
                <a href="#" >
                    <img src="@/assets/icon-left-font.png" alt="" width="20%">
                </a>
            </div>
            <div>
                <a href="#">Accueil</a>
                <router-link to="/users">Utilisateurs</router-link>
                <router-link :to="{ name:'Profil', params: {id: userId} }">Profil</router-link>
                <!-- :to="{ name:'Post', params: {id: postsInfos._id} } -->
                <span class="logout" @click="logout()">Déconnexion</span>
            </div>
        </nav>
    </header>
</template>

<script>
export default ({
    name: "Header",
    computed : {
        userId(){
            if(localStorage.getItem('userId')){
                return localStorage.getItem('userId')
            } else {
                console.log("pas de propriétés dans le localstorage!")
                return {}
            }
        }
    },
    methods: {
        /* --  methode de deconnexion -- 
        1. suppression du token présent dans le localstorage
        2. retour à la page de connexion */
        logout () {
            localStorage.removeItem('token');
            localStorage.removeItem("userId");
            this.$router.push('/')
        }
    }
})
</script>

<style scoped>

nav {
    background-color: white;
    display: flex; 
    justify-content: space-between;
    align-items: baseline;
    padding: 15px; 

}

nav img {
    width: 200px; 
}

nav a {
    text-decoration: none;
    color: grey;
    margin-right: 20px; 
    
    
}

nav a:hover {
    color:#FD2D01;
    cursor: pointer; 
}

.logout {
    padding: 10px 15px; 
    background:  #4E5166;
    border-radius: 25px;
    color: #fff; 
    margin-left: 10px;  
}

.logout:hover {
    color: #fff; 
    background: #FD2D01;
    cursor: pointer;
}

@media screen and (max-width: 620px) {
    nav {
        flex-direction: column; 
        justify-content: center;
        align-items: center;
        gap: 10px; 
    }

    nav a {
        font-size: 13px; 
    }

    .logout {
        padding: 6px 10px ;
        font-size: 12px; 
    }
}

</style>