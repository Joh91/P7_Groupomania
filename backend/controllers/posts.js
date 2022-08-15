const Posts = require('../models/Posts'); 
const User = require('../models/User'); 
const fs = require('fs'); 



/*---- requête Post ----*/ 
exports.createPosts = (req, res, next) => {
    // création de l'objet à conserver dans la bdd 
    const post = new Posts({
        pseudo: req.body.pseudo,
        message: req.body.message,
        like: req.body.like, 
        likers: [],
        userId: req.auth.userId,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }); 
    // post enregistré
    console.log(post)
    post.save()
    .then(() => res.status(201).json({ message: "Post crée !"})) 
    .catch(error => res.status(400).json({error})); 
}; 

/*---- requête Get ----*/ 
exports.getPosts = (req, res, next) => {
    //Affichage des posts
    User.find()
    .then((posts) => {res.status(200).json(posts)})
    .catch((error) => {res.status(400).json({error})})
};