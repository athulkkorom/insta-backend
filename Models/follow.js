const mongoose = require('mongoose');
const { Schema } = mongoose;

const followSchema = new Schema({
  followingby: {type:mongoose.Types.ObjectId,ref:'user'}, 
  followingto: {type:mongoose.Types.ObjectId,ref:'user'}

  
  });
  const Post = mongoose.model('follow', followSchema)