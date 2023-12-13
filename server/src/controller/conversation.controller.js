import asyncHandler from "express-async-handler";
const ConversationModel = require("../model/conversation.model");
const MessageModel = require("../model/message.model");

// @desc   Create conversation

const createConversation = async (req, res, next) => {
  const { senderId, receiverId } = req.body;

  try {
    const newConversation = new ConversationModel({
      members: [senderId, receiverId],
    });
    newConversation = await newConversation.save();
    res.status(201).json(newConversation);
  } catch (err) {
    next(err);
  }
};

// @desc   all conversations

const allConversations = async (req, res, next) => {
  const { userId } = req.params;
  let conversations = await ConversationModel.find({
    members: { $elemMatch: { memberId: userId } },
  });
  res.status(200).json(conversations);
};

// @desc   Delete conversation

const deleteConversation =  async(req, res,next) => {
  const { id } = req.params;
  await Promise.all([
    ConversationModel.deleteOne({ _id: id }),
    MessageModel.deleteMany({ conversationId: id }),
  ]);
  res.status(200).json({ cid, message: "Removed friend from friend list" });
}

//get conv of a user

const fetchUserConversation = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const conversation = await ConversationModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};

// get conv includes two userId

const fetchUsersConversations = async (req, res,next) => {
    const {firstUserId,secondUserId} = req.params;
  try {
    const conversation = await ConversationModel.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  fetchUserConversation,
  fetchUsersConversations,
  deleteConversation,
  allConversations,
  createConversation,
};
