const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware'); // assuming JWT auth middleware

// All tasks (admin or all access)
router.get('/', taskController.getTasks);

// Tasks assigned to current user
router.get('/my-tasks', protect, taskController.getMyTasks);

// Create task
router.post('/', protect, taskController.createTask);

// Update task
router.put('/:id', protect, taskController.updateTask);

// Delete task
router.delete('/:id', protect, taskController.deleteTask);

module.exports = router;
