const Task = require('../models/task');

module.exports.updateTask = async(req, res) => {
    try {
        const { description, status } = req.body;
        const{ id } = req.params;
        const task = await Task.findByIdAndUpdate(id, { description, status }, { new: true, runValidators: true });

        if(!task) {
            return res.status(404).json({ message: 'Task not found' });
        }    
        return res.status(200).json({ 
            message: 'Task updated successfully!!',
            task
        });
        //newTask.save();
        //return res.status(201).json({ message: 'Task updated successfully!!'});
    } catch(error) {
        console.log('Error while updating tasks', error);
        return res.status(201).json({ message: 'Error updating task catch'});
    }
}