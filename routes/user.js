const express= require('express')
const router = express.Router();
const UserController = require("../controller/user");
const authMiddleware = require("../middleware/user-auth")
router.post('/sign',UserController.addUser )
router.post('/login',UserController.loginUser )
router.get('/',UserController.getUser )
router.patch('/patch/:id',authMiddleware,UserController.updateUser )
router.delete('/delete/:id',authMiddleware,UserController.deleteUser )
module.exports = router