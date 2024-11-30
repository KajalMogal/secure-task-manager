const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const task = require('../controllers/updateTask.js');

router.put('/:id', verifyToken, (task.updateTask));

module.exports = router;