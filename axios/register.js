const axios = require('axios');
const inquirer = require('inquirer');

const API_URL = 'http://127.0.0.1:3000';

const register = (async () => {
         const questions = [
            {
                type: 'input',
                name: 'firstname',
                message: 'Enter your first name : ',
                validation: (input) => input ? true : 'firstname is required.'
            },
            {
                type: 'input',
                name: 'lastname',
                message: 'Enter your last name : ',
                validate: (input) => input ? true : 'lastname is required.'
            },
             {
                 type: 'input',
                 name: 'username',
                 message: 'Enter your username :',
                 validation: (input) => input ? true : 'username is required.'
             },
             {
                 type: 'password',
                 name: 'password',
                 message: 'Create your password : ', 
                 validation: (input) => input ? true : 'password is required.'
             },
             
         ];
         try {
             const answer = await inquirer.prompt(questions);
             const response = await axios.post(`${API_URL}/register`, {
                 firstname: answer.firstname,
                 lastname: answer.lastname,
                 username: answer.username,
                 password: answer.password,

             });
             console.log(response.data);
         } catch(error) {
             console.log('error while registering', error.message);
         }
});

module.exports = register;