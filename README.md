# Secure Task Manager
A cli package which can be used for secure task management, where user can register, login and can manage their tasks. Users data is stored in their corresponding account and their passwords are stored in hashed form in the database.

## Tech Stack
Frontend: `commander.js` `inquirer.js`

Backend:  `Node.js` `Express.js` `MongoDB`

## Installation Steps
1. Install secure-task-manager package globally in your system
```bash
   npm install -g secure-task-manager
```

2.To become familier with this package run command
```bash
   secure-task-manager help
```
![homePage](https://github.com/user-attachments/assets/f26cd1fa-a170-4fa7-85d4-9986fcaf28cd)



```bash
   Options:
  -h, --help      display help for command

Commands:
  register|r      Register a new user
  login|l         Login an an existing user
  add|a           Add a new task
  update|u        Update a existing tasks
  display|d       Display all tasks
  delete|del      Delete a task
  help [command]  display help for command
```

3. Create an account

```bash
   secure-task-manager register
```

   ![register](https://github.com/user-attachments/assets/7d218bcc-db9a-4b97-81fe-d02ee85fa680)


4. to login an existing account

```bash
   secure-task-manager login
```

   ![login](https://github.com/user-attachments/assets/64daf2f0-d98b-4a77-a0f9-6f60e1754115)


5. to add new tasks

```bash
   secure-task-manager add
```
   
   ![taskAdd](https://github.com/user-attachments/assets/6460a6fa-c682-480b-bd97-d173ea0c95db)

   

   


## Author

- [KajalMogal](https://github.com/KajalMogal)

## Keywords 

npm, node
