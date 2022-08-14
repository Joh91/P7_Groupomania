// importations 
const router = require('express').Router(); 
const userCtrl = require('../controllers/user')
const userProfilCtrl = require('../controllers/user.profil')


// routes 
router.post('/signup', userCtrl.signup)
// router.post('/login',  userCtrl.login);

router.get('/', userProfilCtrl.getAllUsers); 
router.get('/:id', userProfilCtrl.getOneUser);
router.put('/:id', userProfilCtrl.updateUser); 
router.delete('/:id', userProfilCtrl.deleteUser); 

module.exports = router; 
