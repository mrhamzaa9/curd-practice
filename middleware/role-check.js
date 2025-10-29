const jwt = require("jsonwebtoken");
require("dotenv").config(); 
const secretKey = process.env.SECRET_KEY
const rolecheck = (req, res, next) => {
    try {
       const token = req.cookies.token;
       const verify =  jwt.verify(token, secretKey)
       console.log("verify", verify);
        if (verify.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
       
       if(!verify){
              res.status(402).send({ "erorr": "unauthorized" })
       }
       next()
    }
    catch (erorr) {
        return res.status(500).json({ error: "Internal Server Error"  });
    }
}
module.exports = rolecheck