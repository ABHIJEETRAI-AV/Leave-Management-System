const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const admin = require('../Models/admin.model');
const createToken = require('../Utils/createToken');


async function loginController(req, res) {
    const { username, password } = req.body

    // console.log(req.body)
    // console.log(username)
    const adminInfo = await admin.findOne({ username: username })
    // console.log(adminInfo.username)

    const hashed = adminInfo.password

    if (!adminInfo) {
        res.status(404).json({ message: 'Admin not found' })
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
        res.status(404).json({ message: 'password incorrect' })
    }



}

module.exports = loginController