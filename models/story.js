const { Schema, model } = require("mongoose");

const schema = new Schema({
  date: { type: Date, default: Date.now },
  owner: { type: String, ref: "User" },
  userName: { type: String, required: true },
  clicks: { type: Number, default: 1000 },
  record2048: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  victories: { type: Number, default: 0 },
});

module.exports = model("Story", schema);
