// importations 
const router = require('express').Router(); 
const userProfilCtrl = require('../controllers/user.profile');
const auth = require("../middleware/auth");

// profile
router.get('/', auth, userProfilCtrl.getAllUsers); 
router.get('/:id', auth, userProfilCtrl.getOneUser);
router.put('/:id', auth, userProfilCtrl.updateUser); 
router.delete('/:id', auth, userProfilCtrl.deleteUser); 

module.exports = router;