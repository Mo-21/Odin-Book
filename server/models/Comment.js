const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;
const commentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 600,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(comment) {
  const schema = Joi.object({
    content: Joi.string().min(1).max(600).required(),
  });
  return schema.validate(comment);
}

module.exports = {
  Comment,
  validateComment,
};
