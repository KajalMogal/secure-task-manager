const axios = require('axios');
const inquirer = require('inquirer')
const fs = require('fs');

const API_URL = 'http://127.0.0.1:3000';

 const show = (async () => {
     try {
     const { username }= await inquirer.prompt([
         {
             type: 'input',
             name: 'username',
             message: 'Enter your username:',
             validation: (input) => input ? true : 'username is required.'
         },
     ]);
         const token = fs.readFileSync('Token.txt', 'utf8');
          // Fetch user data.
         const response = await axios.get(`${API_URL}/show/${username}`, { 
                 headers: {
                     Authorization: `Bearer ${token}`,
                 }
             });
        
         const tasks = response.data.tasks;
         //console.log(`${tasks.title}`);
         if(tasks && tasks.length > 0) {
             const taskMap = new Map();

             tasks.forEach(task => {
                 if(task.title) { 
                     if(!taskMap.has(task.title)) {
                         taskMap.set(task.title, []);
                 }
                 taskMap.get(task.title).push({
                    description: task.description,
                    due: task.due,
                    status: task.status
                 });
             }
         });

                 //display grouped task.
                 taskMap.forEach((details, title) => {
                    console.log('--------------------------------------------------------------------------------------'); 
                     console.log(`Title: ${title}`);
                     console.log('Tasks: ');                    
                      details.forEach(({ description,due, status }, index) => {
                        console.log(` - ${index + 1}: ${description.join(',')} | Due Date: ${due} | status: ${status}`);
                      });
                      console.log('--------------------------------------------------------------------------------------');
                     }); 
         } else {
             console.log('No task found !');
         }
  
     } catch (error) {
         console.log('Error while displaying tasks:', error.message);
         if (error.response) {
             console.log('Response data:', error.response.data);
             console.log('Response status:', error.response.status);
         }
     }
 });

 module.exports = show;

