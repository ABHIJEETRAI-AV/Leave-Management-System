const env = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./db/connect');

const mongoose = require('mongoose');

const app = express();


const login = require('./Routes/login');
const SignUp = require('./Routes/SignUp');

app.use(cors())
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
app.use('/adminSignUp', )


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
