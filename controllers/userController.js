const User = require("../models/User");

exports.acceptInvite = async (req, res) => {
  const { name, email, teamId } = req.body;

  const user = await User.create({ name, email, team: teamId, role: "Member" });
  res.status(201).json(user);
};
