const express = require('express'); 
 const router = express.Router();
 const bcrypt = require('bcrypt');
 const fs = require('fs');
 const generateToken = require('../generateToken');
 const User = require('../models/user');

//router.use(express.json());

 router.post('/', async(req, res) => {
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
                //store in file.
                fs.writeFileSync('Token.txt', token);
                console.log('Token generated and stored in file.');
                //saveToken( user._id, user.username, token);
               //user.token = token
               console.log('User Loggged in successfully!');
               
               return res.status(201).json(`Welcome back! you are logged in, ${username}`);
            //      return res.status(201).json({
            //        message: 'user loggedin successfully!',
            //        user: {
            //            id: user._id,
            //            username: user.username,
            //            token
            //        }
            //    }); 
            //res.json(`Welcome back! you are logged in, ${username}`);
             
            // console.log('login')
            // return rs.status(200).json({ message: 'Login !'});
            // console.log('login')
          }  else {
            console.log('Not login successfully !: ', user);
             return res.status(404).json({ message: 'Invalid username or password!'});
         }
      } catch(error) {
             console.log('error during login');
             return res.status(500).json({ message: 'Internal server error'});
         }
 });

module.exports = router;