const User = require('../models/User'); 
const ObjectID = require('mongoose').Types.ObjectId; 

/*---- requête Get pour afficher tous les users -----*/ 
exports.getAllUsers = (req, res, next) => {
    //récupération des comptes depuis la base sans affichier le mdp
    User.find().select('-password')
    .then((users) => {res.status(200).json(users)})
    .catch((error) => {res.status(400).json({error})})
}; 

/*---- requête Get pour afficher un user -----*/ 
exports.getOneUser = (req, res, next) => {
    //récupération d'un compte à l'aide de l'Id sans afficher le mdp
    User.findOne({ _id: req.params.id}).select('-password')
    .then((user) => {res.status(200).json(user)})
    .catch((error) => {res.status(400).json({error})})
}