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
      Id: email._id,
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
    const { name, email, password } = req.body;

    const user_email = await user.findOne({ email:email });
    if (user_email)
      return res.status(400).send({
        message: "This email already exists, please type a unique email id.",
      });

    if (password.length < 6)
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters." });

    const passwordHashed = await bcrypt.hash(password, 12);

    const newUser = new user({
      name,
      email,
      password: passwordHashed,
    
    });

    const accessToken = createToken({ id: newUser._id });

    await newUser.save();

    res.send({
      message: "Register Success!",
      accessToken,
      Id:  newUser._id
      
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_TOKEN);
};

userroute.get("/getProfile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Profile = await user.find({ _id: id });
    res.status(200).send(Profile);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = { userroute };
