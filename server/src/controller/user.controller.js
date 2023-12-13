const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await UserModel.find({}, { username: 1, imageUrl: 1 });
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res) => {
  const { userId, password, isAdmin } = req.body;
  const { id } = req.params;
  if (userId === id || isAdmin) {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const user = await UserModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(user);
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

const deleteUser = async (req, res, next) => {
  const { userId, isAdmin } = req.body;
  const { id } = req.params;

  if (userId === id || isAdmin) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};

const getUser = async (req, res, next) => {
  const { userId } = req.query;
  const { username } = req.query;
  try {
    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    next(err);
  }
};

const getFriends = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    next(err);
  }
};

const followUser = async (req, res, next) => {
  const { userId } = req.body;
  const { id } = req.params;
  if (userId !== id) {
    try {
      const user = await UserModel.findById(id);
      const currentUser = await UserModel.findById(userId);
      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

const unfollowUser = async (req, res, next) => {
  const { userId } = req.body;
  const { id } = req.params;
  if (userId !== id) {
    try {
      const user = await UserModel.findById(id);
      const currentUser = await UserModel.findById(userId);
      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
};

module.exports = {
  getUsers,
  getUser,
  unfollowUser,
  followUser,
  getFriends,
  deleteUser,
  updateUser
};
