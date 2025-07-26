const express = require("express");
const router = express.Router();
const { createTeam, inviteMember } = require("../controllers/teamController");

router.post("/create", createTeam);
router.post("/invite", inviteMember);

module.exports = router;
