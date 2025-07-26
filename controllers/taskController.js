const Task = require('../models/Task');
const transporter = require('../utils/mailer');
const User = require('../models/User'); //

// Get all tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find().populate('assignedTo assignedBy', 'name email');
  res.json(tasks);
};

// Get tasks assigned to current user
exports.getMyTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id })
    .populate('assignedTo assignedBy', 'name email');
  res.json(tasks);
};

// Create task with `assignedBy` set from token
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo, dueDate, projectId } = req.body;

    const newTask = await Task.create({
      title,
      description,
      status,
      assignedTo,
      dueDate,
      projectId,
    });

    // Find assigned user's email
    const assignedUser = await User.findById(assignedTo);
    const assignedUserEmail = assignedUser.email;
    console.log('Assigned User Email:', assignedUserEmail , assignedTo, assignedUser) // Send email notification;
    if (assignedUser) {
      await transporter.sendMail({
        from: '"DevSync Task Manager" <your-email@gmail.com>',
        to: assignedUser.email,
        subject: `📌 New Task Assigned: ${title}`,
        html: `
          <h3>Hello ${assignedUser.name},</h3>
          <p>You have been assigned a new task:</p>
          <ul>
            <li><strong>Title:</strong> ${title}</li>
            <li><strong>Description:</strong> ${description}</li>
            <li><strong>Status:</strong> ${status}</li>
            <li><strong>Due Date:</strong> ${new Date(dueDate).toDateString()}</li>
          </ul>
          <p>Please check your DevSync dashboard for more details.</p>
        `,
      });
    }

    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error('Error creating task and sending mail:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete task
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};
