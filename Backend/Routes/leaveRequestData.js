

const router = require("express").Router();

const LeaveRequestData = require('../Controllers/LeaveRequestData');

router.post('/', LeaveRequestData);

module.exports = router;