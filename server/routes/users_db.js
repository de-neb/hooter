const express = require("express");
const { userModel } = require("../models/User");
const { postModel } = require("../models/Posts");
const { commentModel } = require("../models/Comment");
const { compileTemplate } = require("@vue/compiler-sfc");
const router = express.Router();
const mongoose = require("mongoose");
//home feed
router.get("/", (req, res) => {
  const page = parseInt(req.query.page);
  const toSkip = 10 * page;

  postModel
    .aggregate()
    .skip(toSkip)
    .sample(10)
    .exec(async (err, posts) => {
      if (err) {
        res.send(err.message);
      } else {
        const postsCopy = JSON.parse(JSON.stringify(posts));
        for (let post of postsCopy) {
          const [authorInfo] = await userModel
            .find({
              username: post.author.username,
            })
            .select("first_name last_name -_id");
          const comments = await commentModel.find({ post_id: post._id });
          post.author.first_name = authorInfo.first_name;
          post.author.last_name = authorInfo.last_name;
          post.total_comments = comments.length;
        }
        res.status(200).send(postsCopy);
      }
    });
});

//hoot status
router.get("/hoot/:hootId", (req, res) => {
  const id = req.params.hootId;

  postModel
    .find({ _id: id })
    .lean()
    .exec(async (err, [post]) => {
      if (err) {
        res.send(err.message);
      } else {
        const comments = await commentModel.find({ post_id: post._id });
        post.total_comments = comments.length;
        res.send(post);
      }
    });
});

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
router.get("/hoot/:hootId/comments", (req, res) => {
  const id = req.params.hootId;
  commentModel.find({ post_id: id }, (err, comment) => {
    if (err) {
      console.log(err.message);
      res.send(err.message);
    } else {
      res.status(200).send(comment);
    }
  });
});

//user by username
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

router.get("/user", (req, res) => {
  const id = req.query.id;

  userModel.findById(id, (err, user) => {
    if (err) {
      res.send({ error: err });
    } else {
      res.send({ user });
    }
  });
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
