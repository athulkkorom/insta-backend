const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  contentLink:{type:String,required:true},
  contentType:{type:String,enum:["image,video"]},
  describtion:String,
  postedAt:{type:Date,default:Date.now()}
 
  
  });
  const Post = mongoose.model('Post', postSchema)