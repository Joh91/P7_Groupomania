<template>
  
    <div class="col-12">
        <form>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <button type="submit" class="btn btn-primary">Se connecter</button>
        </form>
    </div>

</template>

<script>

export default ({
    name: "Form-login", 
    data: function (){
        return {
            email: 'email',
            password: 'password',
        }
    },
   
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
