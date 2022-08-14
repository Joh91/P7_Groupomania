const User = require('../models/User'); 
const ObjectID = require('mongoose').Types.ObjectId; 

/*---- requête Get pour afficher tous les users -----*/ 
exports.getAllUsers = (req, res, next) => {
    //récupération des comptes depuis la base sans affichier le mdp
    User.find().select('-password')
    .then((users) => {res.status(200).json(users)})
    .catch((error) => {res.status(400).json({error})})
}; 

/*---- requête Get pour afficher le profil -----*/ 
exports.getOneUser = (req, res, next) => {
    //récupération d'un compte à l'aide de l'Id sans afficher le mdp
    User.findOne({ _id: req.params.id}).select('-password')
    .then((user) => {res.status(200).json(user)})
    .catch((error) => {res.status(400).json({error})})
};

/*---- requête Put pour modifier le profil ----*/
exports.updateUser = (req, res, next) => {
    try {
        User.findOneAndUpdate(
            // recherche de l'id dans la bdd 
            {_id: req.params.id}, 
            // modification de la bio 
            {$set: {bio : req.body.bio, _id: req.params.id}},
            (err, data) => {
                // si aucune erreur les données sont envoyées 
                if(!err) return res.send(data); 
                // si une erreur un message d'erreur est retourné
                if (err) return res.status(500).send({ err });
            })
    } catch (err) {
        return res.status(500).json({ err });
    } 
}; 

exports.deleteUser = (req, res, next) => {
    User.findOne({_id: req.params.id})
    .then (user => {
        user.deleteOne({_id: req.params.id})
        .then(() => {res.status(200).json({message: "profil supprimé !"})})
        .catch(error => res.status(401).json({ error }));
    })
    .catch ((error) => {
        res.status(500).json({error}); 
    })
}