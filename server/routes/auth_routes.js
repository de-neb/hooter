const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
const handleError = require("../helper/handleError");
const router = express.Router();

//create user
///token
const maxAge = 15 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

router.post("/signup", async (req, res) => {
  const { email, username, name, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      first_name: name,
      email: email,
      username: username,
      password: hashedPassword,
    });
    const token = createToken(user._id);
    res.cookie("hooterJWT", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).send({ username: user.username });
  } catch (err) {
    const error = handleError(err);
    res.status(400).send({ error });
  }
});

//login
router.post("/login", async (req, res) => {
  const { userIdentifier, password } = req.body;
  try {
    const user = await userModel.login(userIdentifier, password);
    const token = createToken(user._id);
    res.cookie("hooterJWT", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res
      .status(200)
      .send({ code: 200, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.log(err);
    const error = handleError(err);
    res.status(401).send({ error });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("hooterJWT", "", { maxAge: 1 });
  res.status(200).end();
});

router.post("/check-user", async (req, res) => {
  const userIdentifier = req.body.user;

  try {
    const usernameExists = await userModel.exists({ username: userIdentifier });
    const emailExists = await userModel.exists({ email: userIdentifier });
    if (usernameExists || emailExists) {
      res.status(200).send({ code: 200, userExists: true });
    } else {
      throw new Error("No user or email found");
    }
  } catch (err) {
    res.send({ code: 400, userExists: false });
  }
});

module.exports = router;
