// importation de mongoose pour la création du schema de données
const mongoose = require('mongoose'); 

//définition des modèles Posts afin d'enregistrer les données dans la database
const PostsSchema = mongoose.Schema({
    userId: {type: String, required: true}, 
    pseudo: {type: String, required: true,},
    message: {type: String, trim: true, maxlength: 350,},
    imageUrl: {type: String},
    like: {type: Number, default: 0}, 
    likers: {type: [String]}, 
},
{
    timestamps: true, 
}
);

module.exports = mongoose.model("Posts", PostsSchema); 