// importations 
const router = require('express').Router(); 
const postsCtrl = require('../controllers/posts'); 
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");


router.post('/', auth, multer, postsCtrl.createPosts);
router.put('/:id', auth, multer, postsCtrl.updatePosts); 
router.delete('/:id', auth, postsCtrl.deletePosts); 
router.get('/', auth, postsCtrl.getPosts);
router.post('/like/:id', auth, postsCtrl.getLikes); 
// router.post('/unlike/:id', auth, postsCtrl.getUnlike); 

module.exports = router;