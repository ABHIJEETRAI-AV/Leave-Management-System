

const admin = require('../Models/admin.model');
const employee = require('../Models/employee.model');
const dataCollector = require('../Utils/dataCollector');



async function LeaveRequestData(req, res) {
    const { adminId } = req.body;
    let overallData = []
    // console.log(adminId)
    if (!adminId) {
        return res.status(400).json({ message: 'Admin ID is required' });
    }
    try {
        const data = await admin.find({ _id: adminId });
        // console.log(data)
        const leaveRequest = data[0].leaveRequest
        console.log(leaveRequest)

        const LeaveRequestData = await dataCollector('leave', leaveRequest)
        let employeeData = []
         
        console.log(LeaveRequestData)
        // const leave = data.populate('leaveRequest')
        // console.log(leave)
        for(let i = 0; i < LeaveRequestData.length; i++){
            employeeData[i] = await employee.findOne({ _id: LeaveRequestData[i].employee })
            
        }

        for(let i = 0; i < LeaveRequestData.length; i++){
            overallData[i] = {
                employeeName: employeeData[i].fullName,
                leaveRequest: LeaveRequestData[i]
            }
            
        }
        console.log(overallData)
    res.status(200).json(overallData);
  } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = LeaveRequestData;