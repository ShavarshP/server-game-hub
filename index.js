const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("maladec11");
});

app.listen(process.env.PORT || 5000);
