const router = require("express").Router();
const employee = require('../Models/employee.model');
const admin = require('../Models/admin.model');
const verifyToken = require('../Utils/verifyToken');
const bcrypt = require('bcryptjs');


router.post('/', async (req, res) => {

    const { role, data, token } = req.body;
    const id = verifyToken(token);
    const password = data.password
    const newHashedPassword = await bcrypt.hash(data.newPassword, 10)
    if (role === 'admin') {
        const adminInfo = await admin.findById(id.username)
        const hashed = adminInfo.password
        const comparePasswords = async (password, hashed) => {
            const match = await bcrypt.compare(password, hashed);
            // console.log(match)
            return match;
        };
        
        if (await comparePasswords(password, hashed)) {
            try {
                await admin.findByIdAndUpdate(id.username, {
                    password: newHashedPassword
                })
            }
            catch (err) {
                console.log(err)
            }


        }
    }
    else {
        const employeeInfo = await employee.findById(id.username)
        const hashed = employeeInfo.password
        const comparePasswords = async (password, hashed) => {
            const match = await bcrypt.compare(password, hashed);
            // console.log(match)
            return match;
        };
        
        if (await comparePasswords(password, hashed)) {
            try {
                await employee.findByIdAndUpdate(id.username, {
                    password: newHashedPassword
                })
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            res.status(400).send('Incorrect Password')
        }
    }

    res.status(200).send('Password Changed');

});

module.exports = router;