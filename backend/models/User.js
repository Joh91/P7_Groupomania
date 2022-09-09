// importation de mongoose pour la création du schema de données
const mongoose = require("mongoose"); 
//importation de unique validator pour l'utilisation d'un mail unique
const uniqueValidator = require("mongoose-unique-validator"); 

//définition des modèles Users afin d'enregistrer les données dans la database
const userSchema = mongoose.Schema({
        isAdmin: {type: Boolean, default: false},
        pseudo: {type: String, required: true, minLength: 3, maxLength: 25, unique: true},
        email: {type: String, required: true, unique: true, lowercase: true},
        password: {type: String, required: true }, 
        file: {type: String},
        bio: {type: String, max: 1000},
        followers: {type: [String]},
        following: {type: [String]}, 
        like: {type: Number}, 
        userLike: {type: [String]},
        posts: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts"
        }]
    }, 
    {
        timestamps: true, 
    }
); 

const User = mongoose.model("User", userSchema)

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema), User; 