const express = require('express'); 
const router = express.Router();
const task = require('../controllers/login.js');

//router.use(express.json());

router.post('/', (task.login));

module.exports = router;