const jwt = require('jsonwebtoken');
const createToken = (user) => {
    // const user = { userId: '12345', username: 'Abhijeet' };

    const expiresIn = { expiresIn: '24h'}
    const token = jwt.sign( user, process.env.JWT_SECRET,  expiresIn );
    // console.log(token);
    return token;
}
module.exports = createToken;