const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
path = require('path')
//router('/')
router.use('/auth',require('./auth/index'))
router.use('/profile',require('./profie'))
router.use('/post',require('../post'))
router.use(fileUpload());

router.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.image;
  uploadPath = path.join(__dirname, '../public/image/'+Date.now()+'.' + sampleFile.name.split('.').pop());
  

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

module.exports = router;