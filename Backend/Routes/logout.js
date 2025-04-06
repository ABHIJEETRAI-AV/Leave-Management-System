const router = require("express").Router();
const employee = require('../Models/employee.model');

router.post('/', async (req, res) => {

    const { id } = req.body;
    console.log(req.body)
    await employee.findByIdAndUpdate(id, {
        isActive: false
    })
    res.status(200).send('Logout Success');
}); 

module.exports = router