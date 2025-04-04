const mongoose = require('mongoose');

const admin = require('../Models/admin.model');
const employee = require('../Models/employee.model');
const verifyToken = require('../Utils/verifyToken');

async function getAdmindata(req, res) {
// console.log(req.body.role)

const Id = verifyToken(req.body.token);
let adminData
// console.log(adminId.username)
if(req.body.role === 'Admin'){
     adminData = await admin.find({_id: Id.username});
}else{
    adminData = await employee.find({_id: Id.username});
}

// console.log(adminData)
res.status(200).send(adminData);
}

module.exports = getAdmindata;