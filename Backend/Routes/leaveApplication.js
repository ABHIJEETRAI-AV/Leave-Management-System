

const router = require("express").Router();

const LeaveApplication = require("../Controllers/LeaveApplication");

router.post('/', LeaveApplication)

module.exports = router;