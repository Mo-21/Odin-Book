const router = require("express").Router();

const Post = require("../models/Post");
const { User } = require("../models/User");

// Create a Post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Edit a Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.params.id) {
      res.status(403).json("You can only update your post!");
    } else {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete a Post
router.delete("/:id/delete", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted!");
    } else {
      res.status(403).json("You can only delete your posts!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Like/Dislike a Post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(req.body.userId)) {
      await Post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked!");
    } else {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get a Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get Timeline Posts
router.get("/timeline/all", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const postsFromUser = await Post.find({ userId: user._id });
    const postsFromFollowers = await Promise.all(
      user.followings.map((followingId) => {
        return Post.find({ userId: followingId });
      })
    );
    res.status(200).json(postsFromUser.concat(...postsFromFollowers));
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
