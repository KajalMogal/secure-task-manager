require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

const register = require('./routes/register');
const login = require('./routes/login');
const tasks = require('./routes/tasks');
const updateTask = require('./routes/updateTask');
const show = require('./routes/show');
const deleteTask = require('./routes/deleteTask');
const dbUrl = process.env.DB_URL;
const app = express();


const PORT = process.env.PORT || 3000;

//mongoose.connect('mongodb://127.0.0.1:27017/to-do-manager-db');
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected!');
});

app.use(express.json());
app.use('/register', register);
app.use('/login', login);
app.use('/tasks', tasks);
app.use('/updateTask', updateTask);
app.use('/show', show);
app.use('/deleteTask', deleteTask);

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
