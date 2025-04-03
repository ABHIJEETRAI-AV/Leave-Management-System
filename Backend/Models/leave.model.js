const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    leaveType: { type: String, required: true ,
        enum: ['Sick Leave', 'Casual Leave', 'Earned Leave']
    },
    leaveDays: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Leave = mongoose.model('Leave', leaveSchema);
module.exports = Leave