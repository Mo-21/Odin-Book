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
  if (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  const accessToken = user.generateAuthToken();

  try {
    const savedUser = await user.save();
    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 3_600_000,
        // secure: true,
        sameSite: "strict",
      })
      .json({
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
  const accessToken = user.generateAuthToken();
  console.log(accessToken);

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      maxAge: 60 * 60 * 1000, // 3600000
      httpOnly: true,
      sameSite: "strict",
      // secure: true, //we activate it in production
    })
    .json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
});

//Logout
router.get("/logout", async (req, res) => {
  let token = req.cookies.accessToken;
  console.log(token);
  if (!token) return res.status(400).json({ message: "You are not logged in" });
  if (token === undefined)
    return res.status(400).json({ message: "Invalid Access Token" });
  token = null;
  try {
    res
      .status(200)
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 0,
        // secure: true,
        sameSite: "strict",
      })
      .json({ message: "You have been logged out" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
