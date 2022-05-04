const mongoose = require("mongoose");
const userSchemaAlt = new mongoose.Schema({
  username: String,
  first_name: String,
  last_name: String,
  avatar: {
    img_url: String,
    img_bg: String,
  },
});

const commentSchema = new mongoose.Schema({
  text: String,
  user: userSchemaAlt,
});

module.exports = { commentSchema };
