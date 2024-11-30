const User = require('../models/user');
const Task = require('../models/task');

module.exports.show = async(req, res) => {
    try { 
    const { username } = req.params;

        // Get user by username.
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Show all tasks for user.
        const tasks = await Task.find({ userId: user._id })//.populate('description');

        if(task.length == 0) {
            return res.status(200).json({ message: 'No task found' });
        }
        
        const getDiscription = tasks.map(task => ({ 
            id: task._id,
            title: task.title,
            description: task.description,
            due: task.due ? task.due.toLocaleDateString('en-GB') : 'N/A',
            status: task.status
            //return ` ${task.title} ${task.description} `        
        }));

        console.log('show tasks and token verified :' ,getDiscription);

        return res.status(200).json({ tasks: getDiscription})  ;   
        
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}