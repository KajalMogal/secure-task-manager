const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const task = require('../controllers/show.js');

router.get('/:username',verifyToken, (task.show))

module.exports = router;