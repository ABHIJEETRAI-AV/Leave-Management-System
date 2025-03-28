const mongoose = require('mongoose');
const admin = require('../Models/admin.model');
const createToken = require('../Utils/createToken');
const bcrypt = require('bcrypt');


const SignUpController = async (req, res) => {
    const {username, email, password}= req.body

    // console.table({username, email, password})

    async function hashedpassword(password) {
        const pass =  await bcrypt.hash(password, 10)
        return pass
    }

    const hashedPassword = await hashedpassword(password)
    // console.log(hashedPassword)
    // console.log('SignUpController')
    const token = createToken(req.body)
    try{
        // await admin.create(req.body)
        await admin.create({
            username: username,
            email: email,
            password: hashedPassword

         })
        console.log('Admin Created')
        res.status(201).json({
            message: 'Admin Created',
            token: token

        })
    }
catch(err){
    res.status(500).json({error: err.message})
}

}

 module.exports = SignUpController;