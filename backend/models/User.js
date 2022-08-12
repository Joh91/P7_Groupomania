// importation de mongoose pour la création du schema de données
const mongoose = require("mongoose"); 
//importation de unique validator pour l'utilisation d'un mail unique
const uniqueValidator = require("mongoose-unique-validator"); 

//définition des modèles Users afin d'enregistrer les données dans la database
const userSchema = mongoose.Schema({
    pseudo: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true },
}); 

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema); 