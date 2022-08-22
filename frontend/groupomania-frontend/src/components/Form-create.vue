<template>
  
    <div class="col-12">
        <form>
            <div class="mb-3" >
                <label for="pseudo" class="form-label">Pseudo</label>
                <input v-model="pseudo" type="text" class="form-control" id="pseudo">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <div class="mb-3">
                <label for="confirm-password" class="form-label">Confirmation du mot de passe</label>
                <input v-model="confirmPassword" type="password" class="form-control" id="confirm-password">
            </div>
            <button type="submit" class="btn btn-primary">Créer un compte</button>
        </form>
    </div>

</template>

<script>

export default ({
    name: "Form-create", 
      data: function (){
        return {
            pseudo: 'pseudo', 
            email: 'email',
            password: 'password',
            confirmPassword: 'confirmPassword'
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
