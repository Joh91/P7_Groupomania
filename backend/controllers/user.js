// importation du modèle de données 
const User = require('../models/User');
// importation de bcrypt pour le hasher le mdp dans la bdd
const bcrypt = require('bcrypt'); 
// importation de cryptojs pour crypter l'email dans le bdd 
const cryptoJs = require('crypto-js'); 






/*------- Process Signup -------*/
exports.signup = (req, res, next) => {
    //Utilisation de regex pour sécuriser les champs de saisie et assurer un mdp fort 
    //au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
    const regexPassword = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

    if (regexPassword.test(req.body.password)){
        //chiffrage de l'adresse-mail
        const emailCryptoJs = cryptojs.SHA256(req.body.email, process.env.SECRET_KEYS).toString();

        // configuration de bcrypt pour hasher le mdp
        bcrypt.hash(req.body.password, 10)
        
        .then(hash => {
            // création de l'objet à conserver dans la bdd 
            const user = new User({
                pseudo: req.body.pseudo,
                email: emailCryptoJs,
                password: hash,
            }); 
            // user enregistré dans la bdd
            user.save()
            .then(() => res.status(201).json({ message: "Utilisateur crée !"})) 
            .catch(error => res.status(400).json({error})); 
        })
        .catch(error => res.status(500).json({error}))
    }
    // Si la saisie des champs ne respecte pas notre condition 
    else {
        return res.status(401).json({ message: 'Veuillez saisir une adresse mail valide et un mot de passe contenant au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et un 1 caractère spécial' });
    }
    
}