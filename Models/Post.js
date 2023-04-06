const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  contentLink:{type:String,required:true},
  contentType:{type:String,enum:["image,video"]},
  description:String,
  postedby: {type:mongoose.Types.ObjectId,ref:'user'}, 
  postedAt:{type:Date,default:Date.now()}
 
  
  });
  const Post = mongoose.model('Post', postSchema)