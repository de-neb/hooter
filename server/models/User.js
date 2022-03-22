const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { hootSchema } = require("./Hoot");

const avatarSchema = new mongoose.Schema({ any: {} });

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: [true, "Email has already been taken"],
      required: false,
      validate: {
        validator: (value) => {
          if (value === null) {
            return true;
          }
          return validator.isEmail(value);
        },
        message: "Please enter a valid email address",
      },
    },
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: [true, "Username has already been taken"],
      minlength: [6, "Username must atleast have 6 characters"],
      validate: [
        validator.isAlphanumeric,
        "Username must be in alphanumeric only",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password minimum length is 6 characters"],
    },
    avatar: avatarSchema,
    hoots: [hootSchema],
    birthdate: Date,
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    bio: String,
  },
  { timestamps: { createdAt: "joined_at" } }
);

userSchema.static("login", async function (userIdentifier, password) {
  let user = "";
  if (validator.isEmail(userIdentifier)) {
    user = await this.findOne({ email: userIdentifier }).exec();
  } else {
    user = await this.findOne({ username: userIdentifier }).exec();
  }

  //if username is found check if password matches in db
  if (user) {
    const authRes = await bcrypt.compare(password, user.password);
    if (authRes) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("No user or email found");
});

module.exports = mongoose.model("user", userSchema, "Users");
