const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    employeeID: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    department: { type: String, enum: ['HR', 'IT', 'Finance', 'Marketing', 'Operations', 'Sales', 'Management'], required: true },
    
    profilePicture: { type: String },
    leaveBalance: {
        sickLeave: { type: Number, default: 0 },
        casualLeave: { type: Number, default: 0 },
        earnedLeave: { type: Number, default: 0 }
    },
    leaveHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Leave" }],
    password: { type: String, required: true },
    resetToken: { type: String },
    lastLogin: { type: Date },
    employmentType: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }


}, { timestamps: true })

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee
