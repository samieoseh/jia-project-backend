const User = require("../models/user");
const utils = require('../utils/randomuser')

exports.create = async (req, res) => {
  const randomUser = utils.generateRandomUser()
  const user = new User({...randomUser, role:'user'});
  try {
    const newUser = await user.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    return res.json();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    return res.json();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

exports.getMe = (req, res) => {
  res.send(req.user);
};

exports.deleteMe = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).send();
    }
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.getUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.patchUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const _id = req.params.id;
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json();
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
