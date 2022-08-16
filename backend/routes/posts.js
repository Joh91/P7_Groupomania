// importations 
const router = require('express').Router(); 
const postsCtrl = require('../controllers/posts'); 
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.get('/', auth, postsCtrl.getPosts);
router.post('/', auth, multer, postsCtrl.createPosts);
router.put('/:id', auth, postsCtrl.updatePosts); 
router.delete('/:id', auth, postsCtrl.deletePosts); 

module.exports = router;