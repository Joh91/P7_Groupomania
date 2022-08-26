<template>
    <div class="home">
        <Header/>
        <main class="main-homepage">
            <CreatePost/>
            <PostSection/>
        </main>
        
    </div>
    
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header.vue'
import CreatePost from '@/components/CreatePost.vue'
import PostSection from '@/components/PostSection.vue'

export default ({
    name: 'Homepage', 
    methods: {
        getUsers() {
            axios.get("http://localhost:3000/api/user/", {
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        },

        getPosts() {
            axios.get("http://localhost:3000/api/posts/")
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },
    components: {
        Header,
        CreatePost, 
        PostSection
    }
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
