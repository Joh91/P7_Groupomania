// importation de mongoose pour la création du schema de données
const mongoose = require("mongoose"); 
//importation de unique validator pour l'utilisation d'un mail unique
const uniqueValidator = require("mongoose-unique-validator"); 
// importation de validator 
const { isEmail } = require('validator')

//définition des modèles Users afin d'enregistrer les données dans la database
const userSchema = mongoose.Schema({
        pseudo: {type: String, required: true, minLength: 3, maxLength: 25, unique: true, trimp: true},
        email: {type: String, required: true, validator: [isEmail], unique: true, lowercase: true},
        password: {type: String, required: true },
        imageUrl: {type: String},
        bio: {type: String, max: 1000},
        followers: {type: [String]},
        following: {type: [String]}, 
        like: {type: Number}, 
        userLike: {type: [String]},
    }, 
    {
        timestamps: true, 
    }
); 

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema); 