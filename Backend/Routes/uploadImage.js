const router = require("express").Router();
const employee = require('../Models/employee.model');
const verifyToken = require('../Utils/verifyToken');

router.post('/', async (req, res) => {

    const {image, token} = req.body;
    // console.log(image, token)

    const employeeId = verifyToken(token);

    if(image){

    await employee.findByIdAndUpdate(employeeId.username, {
        profilePicture: image
    });
}

    const employeeData = await employee.findById(employeeId.username);

    res.status(200).json(employeeData);

});

module.exports = router;