const express = require('express');
const router = express.Router();
const task = require('../controllers/register.js');

//register route
router.post('/', (task.register));

module.exports = router;


