const express = require("express");
const auth = require("../../middleware/Auth");
const { body, validationResult } = require("express-validator");
const Profile = require("../../model/Profile");
const User = require("../../model/User");
const Post = require("../../model/Post");
const router = express.Router();

// @route   POST api/posts
// @desc    create post
// @access  private

router.post(
  "/",
  [auth, [body("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const NewPost = new Post({
        name: user.name,
        text: req.body.text,
        avatar: user.avatar,
        user: req.user.id,
      });
      await NewPost.save();
      res.json(NewPost);
    } catch (err) {
      console.log(err.message);
      res.send("server error");
    }
  }
);

// @route   GET api/posts
// @desc    get posts
// @access  private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.send(posts);
    // res.send('auth...')
  } catch (err) {
    res.send("server error");
  }
});

// @route   GET api/posts/:id
// @desc    get post by id
// @access  private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ msg: "post not found" });
    }
    res.send(post);
    // res.send('auth...')
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "post not found" });
    }
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   GET api/posts/user/:id
// @desc    get posts of perticular user
// @access  private

router.get("/user/:id", auth, async (req, res) => {
  try {
    const post = await Post.find({ user: req.user.id }).sort({ date: -1 });
    if (!post) {
      res.status(404).json({ msg: "post not found" });
    }
    res.send(post);
    // res.send('auth...')
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "post not found" });
    }
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   DELETE api/posts/:id
// @desc    delete post
// @access  private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "cannot delete post" });
    }
    post.remove();

    res.send("post deleted");
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "cannot delete post" });
    }
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   PUT api/posts/like/:id
// @desc    like post
// @access  private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if post is already liked by user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "cannot delete post" });
    }
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   DELETE api/posts/like/:id
// @desc    delete like
// @access  private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "cannot delete post" });
    }
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   PUT api/posts/comment/:id
// @desc    add comment
// @access  private

router.put(
  "/comment/:id",
  [auth, [body("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const comment = {
        user: user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };
      post.comments.unshift(comment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.log(err);
      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "cannot add comment" });
      }
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    delete comment
// @access  private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // pulll out comment
    const comment = post.comments.find(
      (comment) => comment.id.toString() === req.params.comment_id
    );

    if (!comment) {
      return res.status(400).json({ msg: "comment not found" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "user not authorized" });
    }

    // takes index of comment to delete
    const RemoveIdx = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);
    post.comments.splice(RemoveIdx, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "cannot delete post" });
    }
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
