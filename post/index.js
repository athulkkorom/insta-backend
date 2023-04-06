const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { findById, findOne, populate } = require('../Models/User');
const Auth = require('../libs/auth');
const post = require('../Models/Post')
const like = require('../Models/like')
const comment = require('../Models/comment')
router.get('/list',Auth.isLoggedin,async(req,res)=>{
    let {page,limit} = req.query
    if (!page){
        page=0
    }
    if (!limit){
        limit=5
    }
  let posts = await post.find().skip(page * limit).limit(limit);
  return res.json({message:posts})
})
router.post('/create',Auth.isLoggedin,(req,res)=>{
    let { contentLink,contentType,description } = req.body
    post.create({
        contentLink,contentType,description,
        postedby: req.user
    }).then(()=>{
        return res.json({message:"post created"})
    })
})
router.get('/:postId',Auth.isLoggedin,async(req,res)=>{
    let {postId} =req.params
    let post = await this.post.findById(postId)
    return res.json({message:post})

})
router.get('/like/:postId',Auth.isLoggedin,async(req,res)=>{
    let {postId} =req.params
    let post = await this.post.findById(postId)
    if(!post){
        return res.status(404).json({meassage:"no post available"})
    }
    let isLiked = await findOne({
        postId,
        likedBy:req.user
    })
    if(isLiked){
        return res.status(400).json({meassage:"Already liked "})

    }
    like.create({
        postId,
        likedBy:req.user
    }).then(()=>{
        return res.json({message:"you liked"})
    })

})
router.delete('/like/:postId',Auth.isLoggedin,async(req,res)=>{
    let {postId} =req.params
    let post = await this.post.findById(postId)
    if(!post){
        return res.status(404).json({meassage:"no post available"})
    }
    let isLiked = await findOne({
        postId,
        likedBy:req.user
    })
    if(isLiked){
    like.findByIdAndRemove(isLiked._id).then(()=>{
        return res.json({message:"you unliked"})

    })

    }
    else{
        return res.status(400).json({meassage:"you are not liked yet "})
    }
})
router.post('/comment/:postId',Auth.isLoggedin,async(req,res)=>{
    let {postId} =req.params
    let {comment} = req.body
    let post = await this.post.findById(postId)
    if(!post){
        return res.status(404).json({meassage:"no post available"})
    }
    
    Comment.create({
        postId,
        likedBy:req.user,
        comment
    }).then(()=>{
        return res.json({message:"you are commented"})
    })

})
router.get('/comment/list/:postId',Auth.isLoggedin,async(req,res)=>{
    let {postId} =req.params
    let post = await this.post.findById(postId)
    if(!post){
        return res.status(404).json({meassage:"no post available"})
    }
    let comments = await comment.find({
        postId
    }).populate("commentedBy","fullName")
    return res.json({comments})
    


})

module.exports = router;