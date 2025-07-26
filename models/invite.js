const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  email: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  role: { type: String, enum: ['pm', 'member'], default: 'member' },
  token: String,
  expiresAt: Date,
});

module.exports = mongoose.model("Invite", inviteSchema);
