<template>
  
    <div class="col-12">
        <form class="form-login" @submit="postLogin">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="dataLogin.email" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input  type="password" class="form-control" id="password" v-model="dataLogin.password">
            </div>
            <button type="submit" class="btn btn-primary">Se connecter</button>
        </form>
    </div>

</template>

<script>
import axios from 'axios'

export default ({
    name: "Form-login", 
    data(){
        return {
            // modèle des données à expédier
            dataLogin: {
                email: '',
                password: ''
            }
        }
    }, 
    methods: {
        // requête Post - envoi des données de connexion 
        postLogin(e) {
            e.preventDefault()
            axios.post("http://localhost:3000/api/auth/login", this.dataLogin)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                this.$router.push('/home');
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
