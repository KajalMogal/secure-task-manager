const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'firstname cannot be blank!']
    },

    lastname: {
        type: String,
        required: [true, 'lastname cannot be blank!']
    },

    username: { 
        type: String,
        unique: true, 
        required: [true, 'username cannot be blank!']
    },
    
    password: {
        type: String,
        required: [true, 'password cannot be blank!']
    },

    //this will be an assignment
    token: {
        type: String,
        default: null
    }
}) 
module.exports = mongoose.model('User', userSchema);