const mongoose = require("mongoose");
const commenterSchema = new mongoose.Schema({
  username: String,
  first_name: String,
  last_name: String,
  avatar: {
    img_url: String,
    img_bg: String,
  },
});
const ObjectId = mongoose.Schema.ObjectId;

const commentSchema = new mongoose.Schema({
  comment: String,
  post_id: ObjectId,
  commenter: commenterSchema,
});

module.exports = {
  commentModel: mongoose.model("comment", commentSchema, "Comments"),
  commentSchema,
};
