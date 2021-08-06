const express = require("express");
const config = require("config");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/getDataList"));
app.use("/api", require("./routes/login"));
app.use(cors());
// app.use("/api/auth", require("./routes/authRoutes"));

const PORT = 5000;
async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(process.env.PORT || PORT, () =>
      console.log(`App has been started on portt ${PORT}...`)
    );
  } catch (e) {
    console.log("Serverr Error", e.message);
    process.exit(1);
  }
}
//aaash350700
start();
