const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema({ any: {} });

const commentSchema = new mongoose.Schema({
  text: String,
  username: "String",
  first_name: "String",
  last_name: "String",
  avatar: avatarSchema,
});

module.exports = { commentSchema };
