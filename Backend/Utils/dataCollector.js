
const admin = require('../Models/admin.model');
const employee = require('../Models/employee.model');
const leave = require('../Models/leave.model');

async function dataCollector(role, arr) {

    let resArr = [];
    console.log(arr)

    for(let i = 0; i < arr.length; i++) {

        if(role === 'Admin') {
             resArr[i] = await admin.findOne({ _id: arr[i] });
            
        } 
        else if(role === 'employee') {
            resArr[i] = await employee.findOne({ _id: arr[i] });
            
        } 
        else {
            resArr[i] = await leave.findOne({ _id: arr[i] });
        }
    }
    console.log(resArr)
    return resArr

    
}

module.exports = dataCollector