const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/user");

router.get("/profile", authMiddleware, async (req, res) => {
  if (!req.user) return res.status(404).json({ message: "User not found" });

  res.json({
    username: req.user.username,
    email: req.user.email,
    joined: req.user.createdAt,
  });
});

module.exports = router;
