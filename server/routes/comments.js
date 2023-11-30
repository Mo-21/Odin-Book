const router = require("express").Router();

const { Comment, validateComment } = require("../models/Comment");
const Post = require("../models/Post");

//Create a Comment
router.post("/", async (req, res) => {
  try {
    const { error } = validateComment({ content: req.body.content });
    if (error) return res.status(400).send(error.message);

    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Delete a Comment
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId.toString() === req.body.userId) {
      await comment.deleteOne();
      res.status(200).json("The comment has been deleted!");
    } else {
      res.status(403).json("You can only delete your comment!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Get all Comments of a post
router.get("/:id", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
