const express= require('express')
const router = express.Router();
const UserController = require("../controller/user");
router.post('/sign',UserController.addUser )
router.post('/login',UserController.loginUser )
router.get('/',UserController.getUser )
router.patch('/patch/:id',UserController.updateUser )
router.delete('/delete/:id',UserController.deleteUser )
module.exports = router