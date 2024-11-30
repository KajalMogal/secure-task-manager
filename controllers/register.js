const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.register = async(req, res) => {
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

 res.json(`Registration successfull! Welcome, ${username}`);


} catch(error) {
        console.log('error while registering', error);
        if(error.code === 11000) {
           return res.status(409).json({ message: 'Username already exists' });
        }
        res.status(500).json({ message: 'Error registering'});
    }
}