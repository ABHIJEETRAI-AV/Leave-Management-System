const express = require('express');
const router = express.Router();

const SignUpController = require('../Controllers/SignUp.controller.js');

console.log('SignUp Route')


router.post('/', SignUpController)



module.exports = router;