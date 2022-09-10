// importation du modèle de données 
const User = require('../models/User');
// importation de bcrypt pour le hasher le mdp dans la bdd
const bcrypt = require('bcrypt'); 
// importation de cryptojs pour crypter l'email dans le bdd 
const cryptoJs = require('crypto-js'); 
const jwt = require('jsonwebtoken');


/*------- Process Signup -------*/
exports.signup = (req, res, next) => {
    //Utilisation de regex pour sécuriser les champs de saisie et assurer un mdp fort 
    //au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
    const regexPassword = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    const regexEmail = (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    // contrôle des champs saisis 
    if (regexPassword.test(req.body.password) && regexEmail.test(req.body.email)){
        // configuration de bcrypt pour hasher le mdp
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // création de l'objet à conserver dans la bdd 
            const user = new User({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
            }); 
            console.log(user.password);
            console.log(user.confirmPassword);
            // user enregistré dans la bdd
            if(req.body.password === req.body.confirmPassword){
                user.save()
                .then(() => res.status(201).json({ message: "Utilisateur crée !"})) 
                .catch(error => res.status(400).json({error})); 
            } else {
                res.status(400).json({message: 'mot de passe et confirmation de mot de passe différent'})
            }
        })
        .catch(error => res.status(500).json({error}))
    }
    // Si la saisie des champs ne respecte pas notre condition 
    else {
        return res.status(400).json({ message: 'Veuillez saisir une adresse mail valide et un mot de passe contenant au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et un 1 caractère spécial' });
    }
};

/*----- Process login ------*/ 
exports.login = async (req, res, next) => {
    //Correspondance entre l'email saisie et celle enregistrée dans la db 
     await User.findOne({email: req.body.email})
    .then(user => {
        // !correspondance 
        if (user === null){
            res.status(401).json({message: "identifiant et/ou mot de passe incorrect(s)"})
        }
        // si correspondance 
        else {
            // correspondance entre le mdp scripté et enregistré dans la db et celui saisi
             bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                // !correspondance 
                if(!valid){
                    res.status(401).json({message: "identifiant et/ou mot de passe incorrect(s)"})
                }
                // si correspondance retourne l'userid et le token d'authentification 
                else {
                    res.status(200).json({
                        userId: user._id,
                        admin: user.isAdmin, 
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.TOKEN_PASSWORD,
                            {expiresIn: "24h"}
                        )
                    })
                }
            })
            .catch(error => {
                res.status(500).json({error}); 
            })
        }
    })
    .catch(error => {
        res.status(500).json({error});
    })
}