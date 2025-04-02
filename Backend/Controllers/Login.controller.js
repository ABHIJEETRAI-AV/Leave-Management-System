const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

    const hashed = adminInfo.password

    if (!adminInfo) {
        // res.status(404).json({ message: 'Admin not found' })
        const employeeInfo = await employee.findOne({ username: username })
        // console.log(adminInfo.password)


    }

    const token = createToken({ username: adminInfo._id })

    const comparePasswords = async (password, hashed) => {
        const match = await bcrypt.compare(password, hashed);
        // console.log(match)
        return match;
    };

    const bool = await comparePasswords(password, hashed)
     

    if (bool) {
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