const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const http = require("http");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const WebSocket = require("ws");

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cors({ origin: "*" }));
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/getDataList"));
app.use("/api", require("./routes/login"));
app.use("/api", require("./routes/generate"));

webSocketServer.on("connection", (ws) => {
  ws.on("message", (m) => {
    webSocketServer.clients.forEach((client) => client.send(m));
  });

  ws.on("error", (e) => ws.send(e));

  ws.send("Hi there, I am a WebSocket server");
});

//maladec
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
