import mongoose from "mongoose";
import crypto from "crypto";

const { Schema } = mongoose;

const hash = (password) => {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
};

const Account = new Schema({
  profile: {
    username: String,
    thumbnail: {
      type: String,
      default: "/static/images/default_thumbnail.png",
    },
    email: { type: String },
  },
  social: {
    google: {
      id: String,
      accessToken: String,
    },
  },
  password: String,
  thoughtCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

Account.statics.findByUsername = function (username) {
  return this.findOne({ "profile.username": username });
};

Account.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

Account.statics.findByEmailOrUsername = function ({ username, email }) {
  return this.findOne({ $or: [{ "profile.username": username }, { email }] });
};

Account.statics.localRegister = function ({ username, email, password }) {
  const account = new this({
    profile: {
      username,
    },
    email,
    password: hash(password),
  });

  return account.save();
};

Account.methods.validatePassword = function (password) {
  const hashed = hash(password);
  return this.password === hashed;
};

export default mongoose.model("Account", Account);
