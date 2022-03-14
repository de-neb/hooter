const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
const handleError = require("./error/handleError");
const router = express.Router();

//all users
router.get("/", (req, res) => {
  const page = parseInt(req.query.page);
  const query = {
    skip: 10 * page,
    limit: 10,
  };

  userModel.find({}, {}, query, (err, users) => {
    if (err) {
      res.send(err.message);
    } else {
      res.status(200).send(users);
    }
  });
});

//hoot status
router.patch("/:uid/hoot/:hootId", async (req, res) => {
  const uid = req.params.uid;
  const hootId = req.params.hootId;
  const action = req.query.action;

  userModel.findById(uid, "hoots", { new: true }, (err, doc) => {
    if (err) {
      res.send(err.message);
    } else {
      const hoots = doc.hoots;
      const foundHoot = hoots.id(hootId);
      switch (action) {
        case "like_hoot":
          foundHoot.likes++;
          break;
        case "unlike_hoot":
          foundHoot.likes--;
          break;
        case "rehoot":
          foundHoot.rehoot++;
          break;
      }
      doc.save();
      const { rehoot, likes } = foundHoot;
      res.status(200).send({ hoot_status: { rehoot, likes } });
    }
  });
});

//user
router.get("/user/:username", (req, res) => {
  const username = req.params.username;

  userModel.findOne(
    { username: username },
    {},
    { select: "-password" },
    (err, user) => {
      if (err) {
        res.send(err.message);
      } else if (user) {
        res.send(user);
      } else {
        const err = { message: "User not found." };
        res.send({ error: err });
      }
    }
  );
});

//delete user
router.delete("/user/:username", (req, res) => {
  userModel.deleteOne({ username: req.params.username }, (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send({ status: 200, message: "User deleted successfully." });
    }
  });
});

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
    console.log(err);
    res.status(400).send({ error });
  }
});

module.exports = router;
