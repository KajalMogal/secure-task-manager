const axios = require('axios');
const fs = require('fs');
const inquirer = require('inquirer');
const API_URL = 'http://127.0.0.1:3000';

 const updateTask = (async() => {
     try {
         const { username } = await inquirer.prompt([
             {
                 type: 'input',
                 name: 'username',
                 message: 'Enter your username: ',
                 validate: (input) => input ? true : 'Username cannot be empty !'
             }
         ]);

         const token = fs.readFileSync('Token.txt', 'utf8');

         const response = await axios.get(`${API_URL}/show/${username}`, { 
                 headers: { 
                 Authorization : `Bearer ${token}`
             }
             });
           
         const tasks = response.data.tasks;

         //console.log('Tasks:', JSON.stringify(tasks, null, 2));

          const { taskId } = await inquirer.prompt([
              {
                  type: 'list',
                  name: 'taskId',
                  message: 'Selct a task to update: ',
                  choices: tasks.map(task => ({
                      name: task.description,
                      value: task.id
                  })),
              },
          ]);

          console.log('selectd task id: ', taskId);

          const { newTaskDescription, taskStatus } = await inquirer.prompt([ 
             //  {
             //      type: 'input',
             //      name: 'newTaskTitle',
             //      message: 'Enter new Task title: ',
             //      validate: (input) => input ? true : 'Task title cannot be empty !'
             //  },
              {
                 type: 'input',
                  name: 'newTaskDescription',
                  message: 'Enter new Task description: ',
                  validate: (input) => input ? true : 'Task description cannot be empty !'
              },
              {
                type: 'input',
                name: 'taskStatus',
                message: 'Please select your task status[pending / completed]: ',
                choices: [ 'pending', 'completed' ]
              }
          ]);
           const responseToUpdateTask = await axios.put(`${API_URL}/updateTask/${taskId}`, {
              //title: newTaskTitle,
              description: newTaskDescription.trim(),
              status: taskStatus 
          },{
              headers: {
                  Authorization: `Bearer ${token}`
              }
           });
         //console.log('taskid:',value);
         console.log("task updated!");
          //console.log("task updated!", responseToUpdateTask.data);
          //return responseToUpdateTask.data;
        
     } catch(error) {
         if(error.response) {
             console.log('Error response', error.response.data);
             console.log('Error',error.response.status);
         } 
         else if(error.request) {
             console.log('Error response', error.request);
             console.log('no response receivrd from server');
         }else {
             console.log('Error message', error.message);
         }
     }
 });

 module.exports = updateTask;


