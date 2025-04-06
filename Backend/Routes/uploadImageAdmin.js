const router = require("express").Router();
const admin = require('../Models/admin.model');
const verifyToken = require('../Utils/verifyToken');

router.post('/', async (req, res) => {

    const {image, token} = req.body;
    // console.log(image, token)

    const employeeId = verifyToken(token);

    if(image){

    await admin.findByIdAndUpdate(employeeId.username, {
        image: image
    });
}

    const employeeData = await admin.findById(employeeId.username);

    res.status(200).json(employeeData);

});

module.exports = router;