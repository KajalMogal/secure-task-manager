require('dotenv').config();
const express = require('express');
const router = express.Router();
const task = require('../controllers/tasks.js');
  
const verifyToken = require('../middleware/verifyToken');


router.post('/',verifyToken, (task.addTask));

module.exports = router;

    



