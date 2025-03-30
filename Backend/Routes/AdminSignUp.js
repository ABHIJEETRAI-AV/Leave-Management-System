const router = require("express").Router();
const AdminsignUp = require("../Controllers/AdminsignUp");

console.log('employee SignUp Route')

router.post('/', AdminsignUp)

module.exports = router;