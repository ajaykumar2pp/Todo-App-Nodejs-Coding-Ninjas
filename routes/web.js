const router = require('express').Router();
const TodoList = require('../app/Model/todoModel')



// Create a new index page task
router.post('/tasks', async (req, res) => {
    try {
        const { description, category, date } = req.body;
        console.log(description, category, date);
        const task = new TodoList({
            description,
            category,
            dueDate: date
        });
        await task.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});


// Get all todo fetch index page 
router.get('/', async (req, res) => {
    try {
        let tasks = await TodoList.find().select('-updatedAt -createdAt -__v').sort({ _id: -1 });
        // console.log(tasks); // Add this line
        res.render('index', { tasks: tasks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch tasks.');
    }
});

// deleting todo tasks
router.post('/delete', async function (req, res) {
    try {
        // Get the task IDs from query parameters
        const taskIds = Object.keys(req.body);// Assuming the task IDs are passed as an array of IDs in the 'ids' parameter

        // Loop through each task ID and delete it
        for (const taskId of taskIds) {
            // Using async/await to handle asynchronous operations
            await TodoList.findByIdAndDelete(taskId);
        }

        return res.redirect('back');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});


// deleting dublicate  todo tasks
// router.post('/delete', async (req, res) => {
//     try {
//       const taskIds = req.body.taskIds;
//       await TodoList.deleteMany({ _id: { $in: taskIds } });
//       res.redirect('/');
//     } catch (error) {
//       console.error(error);
//       res.redirect('/');
//     }
//   });


module.exports = router;