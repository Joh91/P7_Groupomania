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
                <a href="profil.html">Profil</a>
            </div>
        </nav>
    </header>
</template>

<script>

export default ({
    
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

</style>