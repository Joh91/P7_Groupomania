<template>
  
    <div class="col-12">
        <form @submit="postLogin">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="dataLogin.email" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input  type="password" class="form-control" id="password" v-model="dataLogin.password">
            </div>
            <button type="submit" class="btn btn-primary" >Se connecter</button>
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
            axios.post("http://localhost:3000/api/auth/login", this.dataLogin)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
            })
            .catch((error) => {
                console.log(error)
            })
            e.preventDefault();
        }
    }
    
})
</script>

<style scoped>
    form{
        width: 700px; 
    }

    label, button {
        font-weight: bold;
    }

    input {
        border-color: #4E5166
    }

    button {
        background-color: #4E5166; 
        border-color: #4E5166;
        margin-top: 20px; 
    }

    button:hover{
        background: #FD2D01; 
        border-color: #FD2D01; 
    }
</style>
