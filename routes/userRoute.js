const express = require("express");
const router = express.Router();
const { acceptInvite } = require("../controllers/userController");

router.post("/accept-invite", acceptInvite);

module.exports = router;
