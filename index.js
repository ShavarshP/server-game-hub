const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("maladec");
});

const port = 5000;

app.listen(port);
