const router = require("express").Router();
const {
  fetchUserConversation,
  fetchUsersConversations,
  deleteConversation,
  allConversations,
  createConversation,
} = require("../controller/conversation.controller");

router.get("/:userId", fetchUserConversation);
router.delete("/:userId", deleteConversation);
router.post("/", createConversation);
router.get("/userId", allConversations);

router.get("/find/:firstUserId/:secondUserId", fetchUsersConversations);

module.exports = router;
