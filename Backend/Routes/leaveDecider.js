const router = require("express").Router();
const leave = require('../Models/leave.model');

router.post('/', async (req, res) => {
    const { decision, leaveId } = req.body;
    console.log(decision, leaveId)
   
    await leave.findByIdAndUpdate(leaveId, {
        status: decision
    });
    // console.log(leaveData)
    res.status(200).send('Leave Decision Updated');
});

module.exports = router;