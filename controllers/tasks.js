const User = require('../models/user');
const Task = require('../models/task');

module.exports.addTask = async (req, res) => {
    //console.log('task receiving', req.body); 
     try {
       //maincode
       const { title, tasks, username } = req.body;

        //find user by username.
        const user = await User.findOne({ username });
        if(!username) {
            return res.status(404).json({ message: 'User not found, please login first!' });
        }

        const taskPromises = tasks.map(({task, dueDate}) => {
            const newTask = new Task({
                title,
                userId: user._id, //associate taskwith user spcific userid.
                description: task,
                due: new Date(dueDate)
            });
            return newTask.save();
        });
        await Promise.all(taskPromises);

        //test 
        //const token = generateToken(username);
        //console.log('from task route token is: ', token);



        return res.status(201).json('Tasks added sucsessfully!');

     } catch (error) {
         console.error('Error while adding tasks:', error);
         return res.status(500).json({ message: 'Error while adding task' });
     }
 }