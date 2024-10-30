const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const verifyToken = require('../middleware/verifyToken');


 router.delete('/:id', verifyToken, async(req, res) => {
     try {
         const{ id } = req.params;

        //  if(!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({ message: 'Invalid task Id' });
        //  }

        
;         const task = await Task.findByIdAndDelete(id);

         if(!task) {
             return res.status(404).json({ message: 'Task not found !!' });
         }    
         return res.status(204).send();
        
     } catch(error) {
         console.log('Error while deleting tasks', error);
         return res.status(201).json({ message: 'Error while deleting task '});
     }
 });
 module.exports = router;

 ////db.tasks.find({ userId: ObjectId("yourUserIdHere") }).pretty();