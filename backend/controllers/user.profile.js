const User = require('../models/User'); 

/*---- requête Get pour afficher tous les users -----*/ 
exports.getAllUsers = async (req, res, next) => {
    //récupération des comptes depuis la base sans affichier le mdp
    await User.find().select('-password')
    .then((users) => {res.status(200).json(users)})
    .catch((error) => {res.status(400).json({error})})
}; 

/*---- requête Get pour afficher le profil -----*/ 
exports.getOneUser = async (req, res, next) => {
    //récupération d'un compte à l'aide de l'Id sans afficher le mdp
    await User.findOne({ _id: req.params.id}).select('-password')
    .then((user) => {res.status(200).json(user)})
    .catch((error) => {res.status(400).json({error})})
};

/*---- requête Put pour modifier le profil ----*/
exports.updateUser = async (req, res, next) => {
    // définition de l'object comprenant les nouvelles valeurs 
    const userObject = {
        bio: req.body.bio,
        pseudo: req.body.pseudo,
    }

    // recherche de l'id dans la bdd 
    // Object retourné vers la BDD
    await User.findByIdAndUpdate({_id: req.params.id}, {...userObject, _id: req.params.id}) 
    .then((user) => {
            res.status(200).json({message: "Profil modifié !"})
            console.log(postObject)
    })   
    .catch((error) => {
        res.status(400).json({error})
        console.log(error); 
    })
    
}; 

/* --- Requête DELETE pour supprimer un profil --- */ 
exports.deleteUser = async (req, res, next) => {
   await User.findOne({_id: req.params.id})
    .then (user => {
        if (user.userId == req.auth.userId || req.admin == true){
            User.deleteOne({_id: req.params.id})
            .then(() => {res.status(200).json({message: "profil supprimé !"})})
            .catch(error => res.status(401).json({ error }));
        } else {
            res.status(401).json({ message : "Non-autorisé"});
        }

    })
    .catch ((error) => {
        res.status(500).json({error}); 
    })
};