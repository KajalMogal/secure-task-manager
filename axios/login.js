const axios = require('axios');
const inquirer = require('inquirer');

const API_URL = 'http://127.0.0.1:3000';

const login = (async() => {
        
    const questions = [
        {
            type: 'input',
            name: 'username',
            message: 'Enter your username:',
            validation: (input) => input ? true : 'username is required.'
        },
        {
            type: 'input',
            name: 'password',
            message: 'Enter your password:',
            validation: (input) => input ? true : 'password is required.'
        }
    ];
    try {
        const answer = await inquirer.prompt(questions);
        const response = await axios.post(`${API_URL}/login`, {
            username: answer.username,
            password: answer.password
        });
        console.log(response.data);
    } catch(error) {
        console.log('error while login: ', error.response ? error.response.data.message : error.message);
    } 
       
});
module.exports = login;