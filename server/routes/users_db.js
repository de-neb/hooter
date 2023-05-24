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
    .findById(id)
    .lean()
    .exec(async (err, post) => {
      if (err) {
        res.send(err.message);
      } else {
        const comments = await commentModel.find({ post_id: post._id });
        post.total_comments = comments.length;
        res.send(post);
      }
    });
});

router.patch("/hoot/:hootId", async (req, res) => {
  const id = req.params.hootId;
  const action = req.query.action;
  const { otherData } = req.body;

  postModel.findById(id).exec(async (err, post) => {
    if (err) {
      console.log(err.message);
      res.send(err.message);
    } else {
      let newComment;
      let commentRes;
      switch (action) {
        case "like_hoot":
          post.likes++;
          break;
        case "unlike_hoot":
          post.likes--;
          break;
        case "rehoot":
          post.rehoot++;
          break;
        case "add_comment":
          newComment = new commentModel(otherData);
          newComment.save();
          break;
        case "delete_comment":
          commentRes = await commentModel.deleteOne({
            _id: otherData.comment_id,
          });
          break;
      }
      post.save();
      if (!action.includes("comment")) {
        const { rehoot, likes } = post;
        res.status(200).send({ hoot_status: { rehoot, likes } });
      } else {
        if (action.includes("add")) {
          res.status(200).send(newComment);
        } else {
          res.status(200).send(commentRes);
        }
      }
    }
  });
});

//get hoot comments
router.get("/hoot/:hootId/comments", (req, res) => {
  const id = req.params.hootId;
  commentModel
    .find({ post_id: id })
    .sort({ created_at: -1 })
    .exec((err, comments) => {
      if (err) {
        console.log(err.message);
        res.send(err.message);
      } else {
        res.status(200).send(comments);
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
