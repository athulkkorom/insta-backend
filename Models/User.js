const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName:String,
    userName:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    bio:String,
    profileImage:String
 
  
  });
  const User = mongoose.model('User', userSchema)
  module.exports = User;
