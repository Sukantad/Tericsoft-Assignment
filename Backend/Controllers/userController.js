const express = require("express");
const user = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const userroute = express.Router();

dotenv.config();
const JWT_SECRET = process.env.JWT_TOKEN;

userroute.post("/login", async (req, res) => {
  try {
    const email = await user.findOne({ email: req.body.email });
    if (!email) {
      return res.status(400).send({
        status: "error",
        data: "Invalid Credentials",
      });
    }
    const password = bcrypt.compareSync(req.body.password, email.password);
    console.log(password);
    if (!password) {
      return res.status(400).send({
        status: "error",
        data: "Invalid Credentials",
      });
    }

    const token = jwt.sign(req.body, JWT_SECRET);
    return res.status(200).send({
      status: "success",
      Token: token,
      id: email._id,
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      data: "Internal Server Error",
    });
  }
});

userroute.post("/reg", async (req, res) => {
  try {
    const find = await user.findOne({ email: req.body.email });
    if (find) {
      return res.status(400).send({
        status: "error",
        data: "User already exists",
      });
    }
    const details = await user.create(req.body);
    return res.send({
      status: "success",
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      data: "Internal Server Error",
    });
  }
});

userroute.get("/getProfile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Profile = await user.find({ _id: id });
    var User = {
      _id: Profile._id,
      name: Profile.name,
      email: Profile.email,
    };
    res.status(200).send(Profile);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = { userroute };
