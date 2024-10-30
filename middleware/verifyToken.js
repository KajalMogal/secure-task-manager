const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
//const path = require('path');
//const bcrypt = require('bcrypt');

 const verifyToken = async(req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  //get token fron authorization header.
    if(!token) {
       console.log('Token is required!!')
        return res.status(403).json({ message: 'Token is required!!' });
    } else {
        //read the storde token from file.
   // const storedToken = fs.readFileSync('Token.txt', 'utf8').trim();
   // console.log('stordedToken in txt:', storedToken);
    //compare token
    //const isMatch = await bcrypt.compare(token, storedToken);
    //if(isMatch) {
       //if both matches , then verify it.
       jwt.verify(token, process.env.JWT_SECRET,(err, user) => {
           if(err) {
               console.log('Token verification failed!!');
               return res.status(403).json({ message: 'Token verification failed!!' });
           }
           console.log('Token found and varified:');
           req.user = user; //attach user info to the request.
           next();
    });
    }
 };
 module.exports = verifyToken;