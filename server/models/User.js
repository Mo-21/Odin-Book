const mongoose = require("mongoose");
const Joi = require("joi");
const { escape } = require("validator");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    coverPicture: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      max: 255,
      default: "",
    },
    city: {
      type: String,
      max: 50,
      default: "",
    },
    from: {
      type: String,
      max: 50,
      default: "",
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

function validateNewUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    passwordConfirmation: Joi.string()
      .valid(Joi.ref("password"))
      .label("Password confirmation")
      .messages({ "any.only": "{{#label}} does not match the password" })
      .required(),
  });

  return schema.validate(user);
}

//When Signing in
function validateRegisteredUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().max(1024).min(5).required(),
    password: Joi.string().min(5).max(255).trim().required(),
  });

  return schema.validate(user);
}

function sanitizeUser(user) {
  return {
    username: escape(user.username),
    email: escape(user.email),
  };
}

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "1h" }
  );
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  validateNewUser,
  sanitizeUser,
  validateRegisteredUser,
};
