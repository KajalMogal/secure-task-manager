const axios = require('axios');
const fs = require('fs');
const inquirer = require('inquirer');
const task = require('../models/task');
const API_URL = 'http://127.0.0.1:3000';

  const deleteTask = (async() => {
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

         // console.log('Tasks:', JSON.stringify(tasks, null, 2));

           const { taskId } = await inquirer.prompt([
               {
                   type: 'list',
                   name: 'taskId',
                   message: 'Selct a task to delete: ',
                   choices: tasks.map(task => ({
                       name: task.description.join(','),
                       value: task.id
                   })),
               },
           ]);

           console.log('selectd task id: ', taskId);

           const { confirmDeletion } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirmDeletion',
                message: 'Are you sure you want to delete this task ?',
                default: false
            }
           ]);

           if(confirmDeletion) {
            const responseToDeleteTask = await axios.delete(`${API_URL}/deleteTask/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
             });
 
            console.log('Task Deleted successfully !', responseToDeleteTask.data);
            return responseToDeleteTask.data;
           } else {
            console.log('Task deletion request cancelled.');
           } 
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

  module.exports = deleteTask;

