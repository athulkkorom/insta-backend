const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: {type:mongoose.Types.ObjectId,ref:'post'}, 
  commentedBy: {type:mongoose.Types.ObjectId,ref:'user'}, 
  comment:{type:String,required:true},
  commentedAt:{type:Date,default:Date.now()}
 
  
  });
  const comment = mongoose.model('comment', commentSchema)