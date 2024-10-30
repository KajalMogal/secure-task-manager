const jwt = require('jsonwebtoken');
const user = require('./models/user');
require('dotenv').config();

const generateToken = (username) => {
    return jwt.sign(
        { name: username },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
};

module.exports = generateToken;