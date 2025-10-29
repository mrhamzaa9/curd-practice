const express= require('express')
const router = express.Router();
const UserController = require("../controller/user");
const authMiddleware = require("../middleware/user-auth")
const roleMiddleware = require("../middleware/role-check")
router.post('/sign',UserController.addUser )
router.post('/login',UserController.loginUser )
router.get('/',roleMiddleware,UserController.getUser )
router.patch('/patch/:id',authMiddleware,UserController.updateUser )
router.delete('/delete/:id',authMiddleware,UserController.deleteUser )
module.exports = router