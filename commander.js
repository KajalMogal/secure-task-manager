#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();
const CFonts = require('cfonts');

const register = require('./axios/register');
const login = require('./axios/login');
const tasks = require('./axios/tasks');
const updateTask = require( './axios/updateTask'); 
const show = require('./axios/show');
const deleteTask = require('./axios/deleteTask');


CFonts.say('Welcome to', {
  font: 'block',         //font face
  align: 'center',       //alignment of text  
  colors: ['yellow'],    //color 
  background: 'transparent',   //background color
  letterSpacing: 1,
  size: 'big',      //spacing between letters
  lineHeight: 1,         //spacing between lines
  space: true,           //add extra space to the left and right of the text
  env: 'node'            //definr the environment cfonts is being executed in
  
});
CFonts.say('secure task manager', {
  font: 'chrome',         //font face
  align: 'center',       //alignment of text  
  colors: ['yellow'],    //color 
  background: 'transparent',   //background color
  letterSpacing: 1,
  size: 'big',      //spacing between letters
  lineHeight: 1,         //spacing between lines
  space: true,           //add extra space to the left and right of the text
  env: 'node'            //definr the environment cfonts is being executed in
  
});

CFonts.say('securely store and manage tasks', {
  font: 'chrome',         //font face
  align: 'center',       //alignment of text  
  colors: ['system'],      //color 
  background: 'transparent',   //background color
  letterSpacing: 1,
  size: 'small',    //spacing between letters
  lineHeight: 0,         //spacing between lines
  space: true,           //add extra space to the left and right of the text
  env: 'node'            //definr the environment cfonts is being executed in
});
     

program
  .command('register')
  .alias('r')
  .description('Register a new user')
  .action(() => { 
    register();
  });

  program 
      .command('login')
      .alias('l')
      .description('Login an an existing user')
      .action(() => {
        login();
      });
      
 program 
      .command('add')
      .alias('a')
      .description('Add a new task')
      .action(() => {
          tasks();
      });

 program 
       .command('update')
       .alias('u')
       .description('Update a existing tasks')
       .action(() => {
         updateTask();
       });
// let token;
 program
     .command('display')
     .alias('d')
     .description('Display all tasks')
     .action(() => {
        show();
     });

  program
    .command('delete')
    .alias('del')
    .description('Delete a task')   
    .action(() => {
      deleteTask();
    })

program.parse(process.argv);