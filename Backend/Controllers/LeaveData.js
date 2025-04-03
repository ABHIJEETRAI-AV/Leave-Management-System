const leave = require("../Models/leave.model");
const employee = require("../Models/employee.model");
const dataCollector = require("../Utils/dataCollector");

async function LeaveData(req,res){

const employeeData = await employee.findOne({ _id: req.body.employeeId });
// console.log(employeeData.leaveHistory)

const leaveData = await dataCollector('leave', employeeData.leaveHistory)
// console.log(leaveData)

res.status(200).json(leaveData)


}

module.exports = LeaveData