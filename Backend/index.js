const env = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./db/connect');

const mongoose = require('mongoose');

const app = express();


const login = require('./Routes/login');
const SignUp = require('./Routes/SignUp');
const AdminSignUp = require('./Routes/AdminSignUp');
const getAdminData = require('./Routes/GetAdminData');
const leaveApplication = require('./Routes/leaveApplication');
const leaveData = require('./Routes/leaveData');
const leaveRequestData = require('./Routes/leaveRequestData');
const leaveDecider = require('./Routes/leaveDecider');
const employeeData = require('./Routes/getEmployeeData');
const uploadImage = require('./Routes/uploadImage');
const uploadImageAdmin = require('./Routes/uploadImageAdmin');
const logout = require('./Routes/logout');
const changePassword = require('./Routes/changePassword');

app.use(cors(
  {
    origin: '*',
    credentials: true,
  }
));
app.use(express.json());

async function connectDB() {
  try {
    await connect(process.env.MONGO_DB_URL);
   
  } catch (error) {
    console.log(error);
  }
}
connectDB();

app.use('/login' , login)
app.use('/SignUp' , SignUp)
app.use('/EmployeeSignUp', AdminSignUp)
app.use('/getAdminData', getAdminData)
app.use('/leaveApplication', leaveApplication)
app.use('/getLeave', leaveData)
app.use('/LeaveRequestData', leaveRequestData)
app.use('/LeaveDecider', leaveDecider)
app.use('/getEmployeeData', employeeData)
app.use('/uploadImage', uploadImage)
app.use('/uploadImageAdmin', uploadImageAdmin)
app.use('/logout', logout)
app.use('/changePassword', changePassword)


app.listen(3000 , () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
