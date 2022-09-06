<template>
  
    <div class="col-12">
        <form @submit="postCreate" class="form-login">
            <div class="mb-3" >
                <label for="pseudo" class="form-label">Pseudo</label>
                <input v-model="dataCreate.pseudo" type="text" class="form-control" id="pseudo">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="dataCreate.email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input v-model="dataCreate.password" type="password" class="form-control" id="password">
            </div>
            <div class="mb-3">
                <label for="confirm-password" class="form-label">Confirmation du mot de passe</label>
                <input v-model="dataCreate.confirmPassword" type="password" class="form-control" id="confirm-password">
            </div>
            <button type="submit" class="btn btn-primary">Créer un compte</button>
        </form>
    </div>

</template>

<script>

import axios from 'axios'

export default ({
    name: "Form-create", 
    data() {
        return {
            dataCreate: {
                pseudo: '', 
                email: '',
                password: '',
                confirmPassword: ''
            } 
        }
    },
    methods: {
        // requête Post - envoi des données de connexion 
        postCreate(e) {
            axios.post("http://localhost:3000/api/auth/signup", this.dataCreate)
            .then((response) => {
                this.$router.push('/connexion')
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
})
</script>

<style scoped>
   
</style>
