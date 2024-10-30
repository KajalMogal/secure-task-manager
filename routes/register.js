const express = require('express');
 const router = express.Router();
 const bcrypt = require('bcrypt');
 const User = require('../models/user');

//register route
 router.post('/', async(req, res) => {
     try {
     const { firstname, lastname, username, password } = req.body;
     const hashPassword = await bcrypt.hash(password, 12);

     //save in DB
     const user = await User.create ({
         firstname,
         lastname,
         username,
         password: hashPassword
     }); 
    
   
     await user.save();

//     return res.status(200).json({ 
//       success: true,
//       message: `Registratin successfull! Welcome, ${username}`,
//       user: {
//           id: user._id,
//           username: user.username,
//       }
//   });
  res.json(`Registration successfull! Welcome, ${username}`);


 } catch(error) {
         console.log('error while registering', error);
         if(error.code === 11000) {
            return res.status(409).json({ message: 'Username already exists' });
         }
         res.status(500).json({ message: 'Error registering'});
     }
 })

 module.exports = router;


