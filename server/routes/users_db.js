const express = require("express");
const router = express.Router();
const userModel = require("../models/User");

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

  userModel.findOne({ username: username }, (err, user) => {
    if (err) {
      res.send(err.message);
    } else if (user) {
      res.send(user);
    } else {
      const err = { message: "User not found." };
      res.send({ error: err });
    }
  });
});

module.exports = router;
