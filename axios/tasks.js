const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const API_URL = 'http://127.0.0.1:3000';

const tasks = (async () => {
    try {    
     const { username } = await inquirer.prompt([
         {
             type: 'input',
             name: 'username',
             message: 'Enter your  username: ',
             validate: (input) => input ? true : 'User name cannot  be empty !'
         }
     ]);
     const { title } = await inquirer.prompt([ 
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title ',
            validate: (input) => input ? true : 'title cannot be blank!'
        }
     ]);
     
     //test->
     //const tok = generateToken(username.username);
    //const token = await bcrypt.hash(tok, 12);
    const token = fs.readFileSync('Token.txt', 'utf8'); //get token.

        const { numberOfTasks } = await inquirer.prompt([
            {
                type: 'input',
                name: 'numberOfTasks',
                message: 'Enter how many tasks you wany to add: ',
                validate: (input) => {
                    const number = parseInt(input);
                    return !isNaN(number) && number > 0 ? true : 'Entered number should be greater than zero(0).';
                }
            }
        ]);
        const tasks = [];
        for(let i = 0; i < numberOfTasks; i++) {
            const { task } = await inquirer.prompt([
                {
                type: 'input',
                name: 'task',
                message: `Enter task number ${ i + 1 } : `,
                validate: (input) => input ? true : 'Task cannot be empty.'
                }
            ]);

            const { dueDate } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'dueDate',
                    message: `Enter due date for task ${i + 1} (DD-MM-YYYY): `,
                    validate: (input) => input ? true : 'Due date cannot be empty!' 
                }
            ]);

            const [day,month, year] = dueDate.split('-');
            const formattedDueDate = new Date(`${year}-${month}-${day}`);
            tasks.push({ task, dueDate: formattedDueDate });
        }
        //console.log('task collection: ', tasks);
        //console.log('Tokan form axios:', token);
        
        const response = await axios.post(`${API_URL}/tasks`, 
            { title, tasks, username }, 
            {
                headers: {
                    Authorization: `Bearer ${token}` // Ensure the token is in the correct format
                }
            }
        );

        
        console.log(response.data);
        } catch (error) {
            console.error('Error while adding task:', error.response ? error.response.data : error.message);
            console.error('Full error details:', error); // Log the full error object
        }
});
module.exports = tasks;