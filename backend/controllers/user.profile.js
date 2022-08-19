const User = require('../models/User'); 

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
    // définition de l'object comprenant les nouvelles valeurs 
    const userObject = {
        bio: req.body.bio,
        pseudo: req.body.pseudo,
    }

    // recherche de l'id dans la bdd 
    // Object retourné vers la BDD
    User.findByIdAndUpdate(
        req.params.id, 
        {$set: userObject }, 
        (error, docs) => {
            if(!error){
                res.send(docs);
            } else {
                res.status(400).json(error); 
            }
        }
    )
    console.log(userObject);
}; 

/* --- Requête DELETE pour supprimer un profil --- */ 
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
};