const express= require('express')
const router = express.Router();
const UserController = require("../controller/user");
router.post('/sign',UserController.addUser )
router.get('/',UserController.getUser )
module.exports = router