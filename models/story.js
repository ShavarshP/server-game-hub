const { Schema, model } = require("mongoose");

const schema = new Schema({
  date: { type: Date, default: Date.now },
  owner: { type: String, ref: "User" },
  userName: { type: String, required: true },
  clicks: { type: Number, default: 1000 },
});

module.exports = model("Story", schema);
