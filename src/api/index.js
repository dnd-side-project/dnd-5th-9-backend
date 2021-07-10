const express = require('express');
const router = express.Router();
const user = require('./controller/user.ctrl');

router.use('/user', user);

module.exports = router;
