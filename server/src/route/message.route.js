const router = require("express").Router();

const {
  createMessage,
  getMessages,
  allMessages,
} = require("../controller/message.controller");

router.post("/", createMessage);
router.get("/conversationId", getMessages);
router.get("/", allMessages);

module.exports = router;
