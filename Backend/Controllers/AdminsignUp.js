const mopngoose = require('mongoose');
const bcrypt = require('bcrypt');
const employee = require('../Models/employee.model');
const admin = require('../Models/admin.model');
const verifyToken = require('../Utils/verifyToken');

async function AdminSignUpController(req, res) {
const {fullName, email, password} = req.body.data;
const hashedPassword = await bcrypt.hash(password, 10);

const employeeData = {
    fullName: fullName,
    email: email,
    password: hashedPassword        
}
console.log(employeeData)

try{
    
const employeedata = await employee.create(employeeData);
console.log(employeedata);
res.status(200).send({
    message: "Employee Created",
    employeeId: employeedata._id


});


const adminid = verifyToken(req.body.adminId);
const id = adminid.username
console.log(adminid)
console.log(id)


await admin.findByIdAndUpdate(
    id , // The ID of the document to update
   {employee: employeedata._id}, // The updated data
   // { new: true, runValidators: true } // Options: return the updated document and validate
 );

}catch(err){
    res.status(400).json({message: err.message});    
}


}

module.exports = AdminSignUpController ;