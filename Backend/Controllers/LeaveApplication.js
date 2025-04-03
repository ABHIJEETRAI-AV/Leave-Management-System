const leave = require("../Models/leave.model");
const employee = require("../Models/employee.model");
const verifyToken = require("../Utils/verifyToken");

async function LeaveApplication(req,res){
try{
   const leaveId = await leave.create(req.body.data)
   
const adminid = verifyToken(req.body.adminId);
console.log(adminid)

   await leave.findByIdAndUpdate(leaveId._id,{$set:{employee: adminid.username}})
await employee.findByIdAndUpdate(adminid.username,{$push:{leaveHistory: leaveId._id}})


    res.status(200).send('Leave Applied')
    
}
catch(err){
    res.status(400).send(err)
}

}

module.exports = LeaveApplication