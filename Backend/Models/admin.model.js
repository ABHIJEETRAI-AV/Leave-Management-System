const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String,  default: 'admin' },
    
    phone: { type: String,  },
    department: { type: String, enum: ['HR', 'IT', 'Finance', 'Marketing', 'Operations', 'Sales', 'Management'] },
    
    employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    image: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;