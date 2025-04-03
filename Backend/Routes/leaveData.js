

const router = require("express").Router();


const LeaveData = require("../Controllers/LeaveData");



router.post('/', LeaveData)

module.exports = router;