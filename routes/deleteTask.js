const express = require('express');
const router = express.Router();
const task = require('../controllers/deleteTask.js');
const verifyToken = require('../middleware/verifyToken');

 router.delete('/:id', verifyToken, (task.deleteTask));
 
 module.exports = router;