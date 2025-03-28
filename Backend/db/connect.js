const mongoose = require('mongoose');   
const connect = async (url) => {
 await mongoose.connect(url)
console.log('Connected to MongoDB')
}

module.exports = connect;