const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    department: { type: String, enum: ['HR', 'IT', 'Finance', 'Marketing', 'Operations', 'Sales', 'Management'] },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    profilePicture: { type: String },
    totalLeaves: { type: Number, default: 20 },
    leaveBalance: {
        sickLeave: { type: Number, default: 5 },
        casualLeave: { type: Number, default: 5 },
        earnedLeave: { type: Number, default: 10 }
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
