const router = require("express").Router();

const {
  createPost,
  deletePost,
  updatePost,
  postLikes,
  getUserPosts,
  getTimelinePosts,
  fetchPost,
} = require("../controller/post.controller");

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/id", fetchPost);
router.get("/profile/:username", getUserPosts);
router.get("/timeline/:userId", getTimelinePosts);
router.put("/:id/like", postLikes);

module.exports = router;
