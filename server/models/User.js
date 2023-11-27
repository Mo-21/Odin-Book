const mongoose = require("mongoose");
const Joi = require("joi");
const { escape } = require("validator");

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
    coverPicture: {
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
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
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

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  validateNewUser,
  sanitizeUser,
  validateRegisteredUser,
};
