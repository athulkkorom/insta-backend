const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../Models/User')
const saltRounds = 10;

// router.post('/register', async (req, res) => {
//   console.log(req.body)
    //let { userName, password, email, fullName } = req.body;
   // let user = await User.findOne({ $or: [{ userName }, { email }] });
   // if (user) {
   //   return res.status(400).json({ message: 'email or username already exist' });
   // }
  
   // bcrypt.hash(password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
   //   User.create({
     //   email,
     //   userName,
      //  fullName,
      //  password: hash,
    //  })
    //    .then(() => {
     //     return res.json({ message: 'registered' });
      //  })
      //  .catch(() => {
      //    return res.status(400).json({ message: 'something went wrong' });
      //  });
   // });
    //return res.json({ message: 'registering' });
  
//   })

router.post("/register",async(req,res) => {
   let user = await User.findOne({userName:req.body.userName}) || await User.findOne({email:req.body.email});
   if (user) {
     return res.status(400).json({ message: 'email or username already exist' });
   }
  else {
   try{
      bcrypt.hash(password, saltRounds, function (err, hash) {
        const newUser = User({
          userName:req.body.userName,
          email:req.body.email,
          fullName:req.body.fullName,
          password:hash
        })   
        const user = await newUser.save();
        res.status(201).json({message:"user registered"})
   });
   }catch(error){
     res.status(201).json({message:"user registration failed"})
   }
  }
})
  

module.exports = router;

