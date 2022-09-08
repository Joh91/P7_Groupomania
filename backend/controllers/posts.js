const Posts = require('../models/Posts'); 
const User = require('../models/User'); 
const fs = require('fs'); 



/*---- requête Post ----*/ 
exports.createPosts = async (req, res, next) => {
    let image = null 
    if (req.file){
        image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    const post = new Posts({
        message: req.body.message,
        userId: req.auth.userId, 
        file: image, 
    }); 
    // post enregistré
    console.log(post)
    await post.save()
    .then(() => res.status(201).json({ message: "Post crée !"})) 

    
    // création de l'objet à conserver dans la bdd 
    .catch(error => res.status(400).json({error})); 
}; 

/*---- requête Get ----*/ 
exports.getPosts = async (req, res, next) => {
    //Affichage des posts par ordre chronologique
   await Posts.find()
    // .populate('user')
    .sort({ createdAt: -1})
    .then((posts) => {
        User.find()
        .then((users) => {
            res.status(200).json(posts)
        })
        .catch ((error) => {
            res.status(400).json({error})
        })
    })
    .catch((error) => {res.status(400).json({error})});
};

/*---- requête PUT ----*/ 
exports.updatePosts = async (req, res, next) => {
//     //valeurs à modifier; "req files ? " vérifie si un fichier est présent
//   //1er cas: fichier présent
  const postObject = req.file 
  ? {
    message: req.body.message,
    file: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } //2e cas: pas de fichier présent
  : {message: req.body.message, file: null}; 

 await Posts.findOneAndUpdate({_id: req.params.id}, {...postObject, _id: req.params.id})
  .then((post) => {
        //auth
        if (post.userId == req.auth.userId || req.admin == true){
            //récupération du fichier précédent et suppression
            let oldFile = post.file.split('images/')[1];
            fs.unlink(`images/${oldFile}`, () => {
            res.status(200).json({message: "Post modifié !"})})
            console.log(postObject); 
        } else {
            res.status(401).json({ message : "Non-autorisé"});
        }
    })
  .catch((error) => {
        res.status(400).json({error})
        console.log(error); 
    })
}; 


/*---- requête DELETE ----*/ 
exports.deletePosts = async (req, res, next) => {
    await Posts.findOne({_id: req.params.id})
    .then (post => {
        if (post.userId == req.auth.userId || req.admin == true){
            post.deleteOne({_id: req.params.id})
            .then(() => {res.status(200).json({message: "post supprimé !"})})
            .catch(error => res.status(400).json({ error }));
        } else {
            res.status(401).json({ message : "Non-autorisé"});
        }
    })
    .catch ((error) => {
        res.status(500).json({error}); 
    })
};


/*----- requête Get like -----*/ 
exports.getLikes = async (req, res, next) => {
    // récupération du post à liker
    await Posts.find({_id: req.params.id})
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
            .then(() => res.status(200).json({message: "post liké"}))
            .catch((error) => res.status(400).json({error}));
        }
    })
    .catch((error) => {res.status(400).json({error})});
}