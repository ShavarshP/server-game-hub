const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const WSServer = require("express-ws")(app);
// const aWss = WSServer.getWss();
const cors = require("cors");

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
// app.use("/api/results", require("./routes/gameResults"));
let sms = "opaopaoppapa";
app.ws("/io", (ws, req) => {
  ws.send(sms);
  ws.on("message", (msg) => {
    sms = msg;
  });
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    connectionHandler(ws, msg);
    broadcastConnection(ws, msg);
  });
});

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    client.send(msg);
  });
};

// app.use("/api/auth", require("./routes/authRoutes"));
// app.ws("/", (ws, req) => {
//   ws.on("message", (msg) => {
//     msg = JSON.parse(msg);
//     switch (msg.method) {
//       case "connection":
//         connectionHandler(ws, msg);
//         break;
//       case "draw":
//         broadcastConnection(ws, msg);
//         break;
//     }
//   });
// });

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
