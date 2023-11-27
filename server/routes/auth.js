const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const {
  User,
  validateNewUser,
  sanitizeUser,
  validateRegisteredUser,
} = require("../models/User");

//Register
router.post("/register", async (req, res) => {
  sanitizeUser(req.body);
  const { error } = validateNewUser(req.body);
  if (error) return res.status(400).send(error.message);

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//Login
router.post("/login", passport.authenticate("local"), async (req, res) => {
  const { error } = validateRegisteredUser(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: req.body.email });

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

module.exports = router;
