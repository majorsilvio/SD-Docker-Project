const User = require("../models/user");
const redis = require("../util/redis");

// CRUD Controllers

//get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (users) {
      // Store the result in Redis with an expiration time
      await redis.setex(req.originalUrl, 300, JSON.stringify(users)); // Expires in 1 hour
      res.status(200).json(users);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get user by id
exports.getUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    await redis.setex(req.originalUrl, 300, JSON.stringify(user));
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//create user
exports.createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await User.create({ name, email });
    res.status(201).json({ message: "User created successfully!", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update user
exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, email } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    await user.update({ name, email });
    res.status(200).json({ message: "User updated!", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete user
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
