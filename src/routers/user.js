const express = require("express");
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const router = express.Router();

router.post("/users/create", userCtrl.create);

router.post('/users/login', userCtrl.login)
 
router.post('/users/logout', auth, userCtrl.logout)

router.post('/users/logoutAll', auth, userCtrl.logoutAll)

router.get('/users/me', auth, userCtrl.getMe)

router.delete('/users/me', auth, userCtrl.deleteMe)

router.get("/users",auth, userCtrl.getUsers);

router.get('/users/:id', auth, userCtrl.getUser)

router.patch('/users/:id', auth, userCtrl.patchUser)

router.delete('/users/:id', auth, userCtrl.deleteUser)

module.exports = router
