const Task = require('../models/task.js');

module.exports.deleteTask = async(req, res) => {
    try {
        const{ id } = req.params;
       
        const task = await Task.findByIdAndDelete(id);

        if(!task) {
            return res.status(404).json({ message: 'Task not found !!' });
        }    
        return res.status(204).send();
       
    } catch(error) {
        console.log('Error while deleting tasks', error);
        return res.status(201).json({ message: 'Error while deleting task '});
    }
}