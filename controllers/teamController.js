const Team = require("../models/Team");
const User = require("../models/User");
const sendInviteEmail = require("../utils/sendMailInvite");

exports.createTeam = async (req, res) => {
  const { name, userId } = req.body;

  const team = await Team.create({ name });
  const user = await User.findById(userId);
  user.team = team._id;
  user.role = "PM";
  await user.save();

  team.members.push(user._id);
  await team.save();

  res.status(201).json(team);
};

exports.inviteMember = async (req, res) => {
  const { email, teamId } = req.body;

  await sendInviteEmail(email, teamId); // fake send email

  res.status(200).json({ message: "Invitation sent" });
};
