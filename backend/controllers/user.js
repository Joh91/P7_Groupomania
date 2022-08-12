// importation du modèle de données 
const User = require('../models/User');
// importation de bcrypt pour le hasher le mdp 
const bcrypt = require('bcrypt'); 

/*------- Process Signup -------*/
exports.signup = (req, res, next) => {
    // configuration de bcrypt pour hasher le mdp
    bcrypt.hash(req.body.password, 10)
    
    .then(hash => {
        // création de l'objet à conserver dans la bdd 
        const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
        }); 
        // user enregistré dans la bdd
        user.save()
        .then(() => res.status(201).json({ message: "Utilisateur crée !"})) 
        .catch(error => res.status(400).json({error})); 
    })
    .catch(error => res.status(500).json({error}))
}