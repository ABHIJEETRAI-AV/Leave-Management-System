const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const admin = require('../Models/admin.model');
const employee = require('../Models/employee.model');
const createToken = require('../Utils/createToken');


async function loginController(req, res) {
    const { username, password, role } = req.body
    // console.log(role)
    let adminInfo

    // console.log(req.body)
    // console.log(username)
    if(role === 'Admin'){   
     adminInfo = await admin.findOne({ username: username })
    }else{
         adminInfo = await employee.findOne({ fullName: username })
    }
    // console.log(adminInfo.username)
let hashed
    if(adminInfo) {hashed = adminInfo.password}

    if (!adminInfo) {
        // res.status(404).json({ message: 'Admin not found' })
        const employeeInfo = await employee.findOne({ username: username })
        // console.log(adminInfo.password)


    }

    let token

    if(adminInfo) {token = createToken({ username: adminInfo._id })}

    const comparePasswords = async (password, hashed) => {
        const match = await bcrypt.compare(password, hashed);
        // console.log(match)
        return match;
    };

    const bool = adminInfo? await comparePasswords(password, hashed):false
     

    if (bool) {
        if(role != 'Admin'){   
             await employee.findByIdAndUpdate(adminInfo._id, {
                 $set: { 
                    isActive: true
                 }
             })
           }


        res.status(200).json({
            message: 'Login Successful',
            validity: true,
            token: token
            

        })
        console.log('login successfull')
    }
    else {
        res.status(404).json({ message: 'password incorrect' ,
            bool: 0
        })
    }



}

module.exports = loginController