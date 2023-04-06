const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../Models/User');
const { findById } = require('../../Models/User');
const Auth = require('../../libs/auth');

const saltRounds = 10;
router.get('/',Auth.isLoggedin,async(req,res)=>{
  
return res.json({user:req.user})
})
router.put('./',Auth.isLoggedin,async(req,res)=>{
    let{ fullName,userName,email } = req.body;
    let user=req.user;
    if(userName){
        user.userName=userName
    }
    if(email){
        let validateEmail = await user.findOne({email})
        if(validate){
            return res.status(400).json({message:"email already exist"})
        
        }
        user.email=email
    }
    if(fullName){
        user.fullName=fullName
    }
    user.save().then(()=>{
        return res.json({message:"profile updated "})
    })
})
router.post('/follow',Auth.isLoggedin, async(req,res)=>{
    let {followingto} = req.body;
    let checkfollow = await folloe.findOne({
        followingto,
        followingby:req.user

    })
    if(checkfollow){
        return res.status(403).json({message:"you are following"})
    }
    follow.create({
        followingto,
        followingby:req.user

    }).then(()=>{
        return res.json({message:"follwing"})
    })
    
})
router.get('/list/following',Auth.isLoggedin,async(req,res)=>{
    let follwing = await follow.find({followingby:req.user}).populate('followingto','fullName userName email')
    return res.json({follwing})
})
router.get('/list/follower',Auth.isLoggedin,async(req,res)=>{
    let follwer = await follow.find({followingto:req.user}).populate('followingby','fullName userName email')
    return res.json({follwer})
})
module.exports = router;