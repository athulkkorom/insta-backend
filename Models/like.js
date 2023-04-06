const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
  postId: {type:mongoose.Types.ObjectId,ref:'post'}, 
  likedBy: {type:mongoose.Types.ObjectId,ref:'user'}, 

  likedAt:{type:Date,default:Date.now()}
 
  
  });
  const like = mongoose.model('like', likeSchema)