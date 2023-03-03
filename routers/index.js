const express = require('express');
const router = express.Router();
//router('/')
router.use('/auth',require('./auth/index'))
module.exports = router;