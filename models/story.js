const { Schema, model } = require("mongoose");

const schema = new Schema({
  date: { type: Date, default: Date.now },
  userName: { type: String, unique: true },
  clicks: { type: Number, default: 1000 },
  record2048: { type: Number, default: 0 },
});

module.exports = model("Story", schema);