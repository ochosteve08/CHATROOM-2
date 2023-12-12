const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");

//REGISTER
const Register = async (req, res, next) => {
  try {
    const { username, email, password, profilePicture } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill out all the input fields");
    }

    const checkUser = await UserModel.countDocuments({ email });
    if (checkUser) {
      res.status(403);
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    if (profilePicture) {
      newUser.profilePicture = profilePicture;
    }

    //save user and respond
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !pass) {
      res.status(400);
      throw new Error("Please fill all the input fields");
    }

    const user = await UserModel.findOne({ email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json("Invalid credentials");

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { Register, Login };
