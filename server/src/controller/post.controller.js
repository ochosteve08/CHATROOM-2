const UserModel = require("../model/user.model");
const PostModel = require("../model/post.model");

const createPost = async (req, res, next) => {
  const newPost = new PostModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
};

//update a post

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    next(err);
  }
};

//delete a post

const deletePost = async (req, res, next) => {
  const { userId } = req.body;
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    next(err);
  }
};

//like / dislike a post

const postLikes = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await PostModel.updateOne({ $push: { likes: userId } });
      res.status(200).json("The post has been liked");
    } else {
      await PostModel.updateOne({ $pull: { likes: userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//get a post

const fetchPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get timeline posts

const getTimelinePosts = async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(req.params.userId);
    const userPosts = await PostModel.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    next(err);
  }
};

//get user's all posts

const getUserPosts = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username: username });
    const posts = await PostModel.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
  postLikes,
  getUserPosts,
  getTimelinePosts,
  fetchPost,
};
