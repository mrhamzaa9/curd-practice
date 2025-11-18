const express = require('express');
const app = express();
const mongoose = require("./db/connection ");
const cors = require("cors");
const bodyParser = require("body-parser");
const userApis = require("./routes/user");
const cookieParser = require("cookie-parser");
require("dotenv").config(); 
const allowedOrigins = [
  "http://localhost:5173",
  "https://auth-react-aeqz.vercel.app",
  "http://localhost:4173"
];
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

const PORT = process.env.PORT

// middleware for using to converter the data into json format
app.use(express.json())
app.use(cookieParser()); 
// app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));
// rest api of user
app.use("/user", userApis)




// Start the server
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});