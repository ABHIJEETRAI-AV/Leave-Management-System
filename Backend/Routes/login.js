const router = require('express').Router();
const loginController = require('../Controllers/Login.controller');


console.log('Login Route')

    router.post('/', loginController)


module.exports = router;