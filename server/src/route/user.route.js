const router = require("express").Router();
const {
  getUsers,
  getUser,
  unfollowUser,
  followUser,
  getFriends,
  deleteUser,
  updateUser,
} = require("../controller/user.controller.js");


router.get('/',getUsers)
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/friends/:userId",getFriends)
router.put("/:id/follow",followUser)
router.put("/:id/unfollow", unfollowUser);

module.exports = router