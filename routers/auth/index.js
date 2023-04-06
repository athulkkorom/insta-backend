const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../Models/User')
const saltRounds = 10;



router.post("/register", async (req, res) => {
  console.log(req.body)
  let user = await User.findOne({ userName: req.body.userName }) || await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: 'email or username already exist' });
  }
  else {
    try {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });

      const newUser =new User({
        userName: req.body.userName,
        email: req.body.email,
        fullName: req.body.fullName,
        password: hashedPassword
      });
      
      const savedUser = await newUser.save();
      res.status(201).json({ message: "user registered" });
    } catch (error) {
      res.status(500).json({ message: "user registration failed" });
    }
  }
});
router.post("/login", async (req, res)=>{
  let user = await User.findOne({ userName: req.body.userName }) || await User.findOne({ email: req.body.email });
  if (user) {
    bcrypt.compare(req.body.password, user.password,(err,result)=>{
      if(result){
        var token = jwt.sign({ userId: 'user_id' }, 'insta');
        res.json({message:'login successful',token})

      }
      else{
        return res.status(400).json({ message: 'email or username already exist' });

      }
    })
  }
  else{
    return res.status(400).json({ message: 'email or username already exist' });

  }

})



module.exports = router;

  


