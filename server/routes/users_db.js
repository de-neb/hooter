const express = require("express");
const { userModel } = require("../models/User");
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
  const { otherData } = req.body;

  userModel.findById(uid, "hoots", { new: true }, (err, doc) => {
    if (err) {
      console.log(err.message);
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
        case "add_comment":
          foundHoot.comments.push(otherData);
          break;
        case "delete_comment":
          foundHoot.comments.id(otherData._id).remove();
          break;
        case "get_comments":
          break;
      }
      doc.save();
      if (!action.includes("comment")) {
        const { rehoot, likes } = foundHoot;
        res.status(200).send({ hoot_status: { rehoot, likes } });
      } else {
        res.status(200).send(foundHoot.comments);
      }
    }
  });
});

//get hoot comments
router.get("/:uid/hoot/:hootId/comments", (req, res) => {
  const uid = req.params.uid;
  const hootId = req.params.hootId;

  userModel.findById(uid, "hoots", { new: true }, (err, doc) => {
    if (err) {
      console.log(err.message);
      res.send(err.message);
    } else {
      const hoots = doc.hoots;
      const foundHoot = hoots.id(hootId);
      res.status(200).send(foundHoot.comments);
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

module.exports = router;
