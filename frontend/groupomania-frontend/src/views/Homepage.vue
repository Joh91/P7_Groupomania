<template>
    <div>
        <Header/>
        <CreatePost/>
    </div>
    
</template>

<script>
import Header from '@/components/Header.vue'
import CreatePost from '@/components/CreatePost.vue'

export default ({
    name: 'Homepage', 
    components: {
        Header,
        CreatePost
    }
})
</script>

<style scoped>

</style>
