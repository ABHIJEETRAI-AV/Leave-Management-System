const leave = require("../Models/leave.model");
const employee = require("../Models/employee.model");
const admin = require("../Models/admin.model");
const verifyToken = require("../Utils/verifyToken");


async function LeaveApplication(req, res) {
    try {
        const leaveId = await leave.create(req.body.data)

        const adminid = verifyToken(req.body.adminId);
        // console.log(adminid)

        const employeeData = await employee.findById(adminid.username);
        // console.log(employeeData)
        const AdminData = await admin.findById(employeeData.admin);
        const AdminDataId = AdminData._id
        // console.log(AdminDataId)

        await leave.findByIdAndUpdate(leaveId._id, {
            $set: { employee: adminid.username },
             $set: {admin: AdminDataId }

        })
        // console.log(req.body.data.leaveType)
        await employee.findByIdAndUpdate(adminid.username, {
            $push: { leaveHistory: leaveId._id },
            $inc: {
                totalLeaves: -1,
                ...(req.body.leaveType === 'Casual Leave' && { leaveBalance:{casualLeave: -1 }}),
                ...(req.body.leaveType === 'Sick Leave' && { leaveBalance:{sicklLeave: -1} }),
                ...(req.body.leaveType === 'Earned Leave' && { leaveBalance:{earnedlLeave: -1 }})

            }

        })


        res.status(200).send('Leave Applied')

    }
    catch (err) {
        res.status(400).send(err)
    }

}

module.exports = LeaveApplication