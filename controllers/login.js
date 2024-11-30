const User = require('../models/user');
const bcrypt = require('bcrypt');
const fs = require('fs');
const generateToken = require('../generateToken');

module.exports.login = async(req, res) => {
    try { 
         const { username, password } = req.body;
        
             // Find the user by username
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'Invalid username or password.' });
        }

             const match = await bcrypt.compare(password, user.password);
             if(!match) {
                return res.status(404).json({ message: 'Invalid username or password!'});
             }
             
             if(match) {
    
                const token = generateToken(user.username);
                
                res.status({ message: 'Token : ', token});
                console.log('Token is: ', token);
              
                fs.writeFileSync('Token.txt', token);   //store in file.
                console.log('Token generated and stored in file.');
               console.log('User Loggged in successfully!');
               
               return res.status(201).json(`Welcome back! you are logged in, ${username}`);
          }  else {
            console.log('Not login successfully !: ', user);
             return res.status(404).json({ message: 'Invalid username or password!'});
         }
      } catch(error) {
             console.log('error during login');
             return res.status(500).json({ message: 'Internal server error'});
         }
 }