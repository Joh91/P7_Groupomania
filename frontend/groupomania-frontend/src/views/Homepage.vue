<template>
    <div class="home">
        <Header/>
        <CreatePost/>
        <PostSection/> 
    </div>
    
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header.vue'
import CreatePost from '@/components/CreatePost.vue'
import PostSection from '@/components/PostSection.vue'

export default ({
    name: 'Homepage', 

    mounted () {
    // retour à la page de connexion lorsque le token arrive à expiration 
        let token = localStorage.getItem('token');
        if(!token) {
            this.$router.push('/');
        }
    },


    components: {
        Header,
        CreatePost,
        PostSection
    }, 
})
</script>

<style scoped>
    .home {
        background: linear-gradient(356deg, rgba(255,215,215,1) 0%, rgba(253,45,1,0.5914740896358543) 92%);
        background-repeat: no-repeat;
        background-attachment: fixed;
        margin: auto;  
    }; 

    .main-homepage {
        display: flex; 
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
