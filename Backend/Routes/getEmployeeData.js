const router = require("express").Router();
const admin = require('../Models/admin.model');
const dataCollector = require("../Utils/dataCollector");

router.post('/', async (req, res) => {
    // console.log(req.body)

    const adminData = await admin.find({ _id: req.body.Id});
    // console.log(adminData)

    const employeeData = await dataCollector('employee', adminData[0].employee)


    const EmployeeData = {
        employee: employeeData,
        totalEmployee: employeeData.length,
        
    }

    res.status(200).json(employeeData);



});

module.exports = router;