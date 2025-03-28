const jwt = require('jsonwebtoken');

function verifyToken(token){
   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch(err) {
        return null;
    }
}

module.exports = verifyToken;