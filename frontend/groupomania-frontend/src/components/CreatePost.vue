<template>
    <div class="add-post">
        <h2>Ajouter un post</h2>
        <div class = "card">
            <form class="create-post" @submit="addPost">
                <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea  type="text" class="form-control" id="message"  v-model='message'></textarea>
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Ajout d'un fichier (JPG, JPEG, PNG, GIF)</label>
                    <input class="form-control" type="file" id="formFile" @change="onFileSelected" ref="file">
                </div>
                <button type="submit" class="btn btn-primary">Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default ({
    name: "CreatePost", 
    data (){
        return {
            message: "",
            file: null, 
        }
    }, 
    methods: {
        // ajout d'un fichier 
        onFileSelected(){
            this.file = this.$refs.file.files[0]; 
            console.log(this.file)
        },
        // requête Post --- Créer un post 
        async addPost(){
            try {
                let data = new FormData();
                data.append("message", this.message);
                data.append("image", this.file);
                console.log("test data", data)

                if (this.message != "" ){
                    await axios.post("http://localhost:3000/api/posts", data)
                    .then((response) => {
                        console.log("test1", response )
                        console.log("test2", data.file)
                    })
                }  
            } catch(error) {
                console.log(error)
            }  
        },
    }
})
</script>

<style scoped>
    .add-post{
    background: #fff; 
    margin: 60px auto; 
    padding: 50px; 
    border-radius: 15px; 
    width: 70%; 
    }
    .add-post h2 {
        font-weight: bold;
        font-size: 20px;
        color:#FD2D01;
    }
    .head {
        display: flex; 
        gap: 15px; 
        justify-content: baseline;
        margin: 40px 0 0;
        padding: 10px; 
        border-radius: 15px 15px 0 0;
        background-color: #faebeb;
    }
    .head h3 {
        font-size: 18px;
    }
    .create-post {
        background: #fff;
        border: none; 
        padding: 10px; 
    }
    .card {
        border: none; 
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

    @media screen and (max-width: 750px) {
        .add-post { 
            width: 90%; 
            padding: 50px 20px; 
        }

        .form-label {
            font-size: 14px;
            display: flex; 
            justify-content: flex-start;
        }

        .form-control {
            font-size: 14px; 
        }
    
    }

</style>
