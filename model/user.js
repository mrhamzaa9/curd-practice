const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
         trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
         trim: true,
    },
    age: {
        type: Number,
        required: true,
         trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
     role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user'           
  },
  image:{
    type:String,
    required:true
  },
  imageId: {
     type: String,
     }    
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);