require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    
    const user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) return res.status(400).send({ message: "User already exists" });

    const newUser = await User.create(req.body);
    const token = newToken(newUser);

    return res.status(201).send({
      msg: "User created successfully",
      name: newUser.name,
      profileImage: newUser.profileImage,
      token,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ message: "Please enter both email or password" });
    }
    const user = await User.findOne({ email: req.body.email }).lean().exec();
    if (!user) return res.status(400).send({ message: "User not Found" });

    const match = bcrypt.compareSync(req.body.password, user.password);

    if (!match)
      return res
        .status(400)
        .send({ message: "Your Mail or Password is incorrect" });

    const token = newToken(user);

    return res.status(200).send({
      msg: "Login Successful",
      name: user.name,
      profileImage: user.profileImage,
      token,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { register, login, newToken };
