const { Schema, model } = require("mongoose");

const schema = new Schema({
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: "User" },
  userName: { type: String, unique: true },
  clicks: { type: Number, default: 1000 },
});

module.exports = model("Story", schema);
