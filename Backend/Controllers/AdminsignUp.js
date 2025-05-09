const mopngoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employee = require('../Models/employee.model');
const admin = require('../Models/admin.model');
const verifyToken = require('../Utils/verifyToken');
const nodemailer = require('../Utils/nodemailer');

async function AdminSignUpController(req, res) {
    const { fullName, email, password } = req.body.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const employeeData = {
        fullName: fullName,
        email: email,
        password: hashedPassword
    }
    console.log(employeeData)

    try {

        const employeedata = await employee.create(employeeData);
        console.log(employeedata);

        const adminid =  verifyToken(req.body.adminId);
        
        const id = adminid.username
        // console.log(adminid)
        // console.log(id)

        await employee.findByIdAndUpdate(
            employeedata._id, // The ID of the document to update
            { admin: id }// The updated data
            // { new: true, runValidators: true } // Options: return the updated document and validate
        );

        // const to = employeedata.email;
        // const text = `Hello ${fullName},\n\nYour account has been created successfully.\n\nPlease log in to your account to access your dashboard.\n\n Your login details are \n\n username : ${fullName} \n\n password : ${password}` 

        // const mail = await nodemailer(to, text)


        res.status(200).send({
            message: "Employee Created",
            employeeId: employeedata._id


        });







        await admin.findByIdAndUpdate(
            id, // The ID of the document to update
            { $push: { employee: employeedata._id } }, // The updated data
            // { new: true, runValidators: true } // Options: return the updated document and validate
        );

    } catch (err) {
        res.status(400).json({ message: err.message });
    }


}

module.exports = AdminSignUpController;