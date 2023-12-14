const MessageModel = require("../model/message.model");

//add
const createMessage = async (req, res, next) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    next(err);
  }
};

//get

const getMessages = async (req, res, next) => {
  const { conversationId } = req.params;
  try {
    const messages = await MessageModel.find({
      conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

// @desc   All messages
const allMessages = async (req, res, next) => {
  const allMsg = await MessageModel.find({ conversationId: { $in: req.body } });
  res.status(200).json(allMsg);
};

module.exports = {
  createMessage,
  getMessages,
  allMessages,
};
