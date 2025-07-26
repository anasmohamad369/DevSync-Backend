const Dev = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Dev.find({}, 'name email _id'); // Fetch only required fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};
