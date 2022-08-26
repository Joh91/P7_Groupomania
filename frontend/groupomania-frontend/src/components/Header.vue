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
                <a href="#">Utilisateurs</a>
                <a href="profil.html">Profil</a>
                <span class="logout" @click="logout()">Déconnexion</span>
            </div>
        </nav>
    </header>
</template>

<script>
export default ({
    name: "Header",
    methods: {
        /* --  methode de deconnexion -- 
        1. suppression du token présent dans le localstorage
        2. retour à la page de connexion */
        logout () {
            localStorage.removeItem('token');
            this.$router.push('/')
        }
    }
})
</script>

<style scoped>

nav {
    background-color: white;
    display: flex; 
    justify-content: space-around;
    align-items: baseline;
    padding: 15px 0 15px

}

nav img {
    width: 20%; 
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

</style>