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
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }); 
    // post enregistré
    console.log(post)
    post.save()
    .then(() => res.status(201).json({ message: "Post crée !"})) 
    .catch(error => res.status(400).json({error})); 
}; 

/*---- requête Get ----*/ 
exports.getPosts = (req, res, next) => {
    //Affichage des posts par ordre chronologique
    Posts.find().sort({ createdAt: -1})
    .then((posts) => {res.status(200).json(posts)})
    .catch((error) => {res.status(400).json({error})});
};

/*---- requête PUT ----*/ 
exports.updatePosts = (req, res, next) => {
    Posts.findOneAndUpdate(
        // recherche de l'id dans la bdd 
        {_id: req.params.id}, 
        // modification de la bio 
        {$set: {message : req.body.message, _id: req.params.id}},
        (err, data) => {
            // si aucune erreur les données sont envoyées 
            if(!err) return res.send(data); 
            // si une erreur un message d'erreur est retourné
            if (err) return res.status(500).send({ err });
        }
    )
}; 


/*---- requête DELETE ----*/ 
exports.deletePosts = (req, res, next) => {
    Posts.findOne({_id: req.params.id})
    .then (post => {
        post.deleteOne({_id: req.params.id})
        .then(() => {res.status(200).json({message: "post supprimé !"})})
        .catch(error => res.status(400).json({ error }));
    })
    .catch ((error) => {
        res.status(500).json({error}); 
    })
};


/*----- requête Get like -----*/ 
exports.getLikes = (req, res, next) => {
    // récupération du post à liker
    Posts.find({_id: req.params.id})
    .then((post) => {
        // l'utilisateur n'a pas encore liké, userId ne se trouve pas dans l'array Likers 
        if(!post.likers.includes(req.body.userId)){
            // Update de la valeur de like et ajout de l'userId dans array Likers
            Posts.updateOne({_id: req.params.id}, {$inc: {like: +1}, $push: {likers: req.body.userId}})
            .then(() => res.status(200).json({message: "post liké"}))
            .catch((error) => res.status(400).json({error}));
            
            // Utilisateur annule son like
        } else if (post.likers.includes(req.body.userId) && req.body.like === 0){
            // Update de la valeur de like et ajout de l'userId dans array Likers
            Posts.updateOne({_id: req.params.id}, {$inc: {like: -1}, $push: {likers: req.body.userId}})
            .then(() => res.status(200).json({message: "like retiré"}))
            .catch((error) => res.status(400).json({error}));
        }
    })
}