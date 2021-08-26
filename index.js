const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const server = require("http").Server(app);

const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
app.use(cors({ origin: "*" }));

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
app.use("/api", require("./routes/generate"));
// app.use("/api/results", require("./routes/gameResults"));

const rooms = {};
io.on("connection", (socket) => {
  socket.on("ROOM:JOIN", ({ roomId, userName }) => {
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId] = [...rooms[roomId], socket.id];
    // const users = [...rooms.get(roomId).get("users").values()];
    const users = userName;
    socket.to(roomId).broadcast.emit("ROOM:SET_USERS", users);
  });
});

const PORT = 5000;
async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    server.listen(process.env.PORT || PORT, () =>
      console.log(`App has been started on portt ${PORT}...`)
    );
  } catch (e) {
    console.log("Serverr Error", e.message);
    process.exit(1);
  }
}
//aaash350700
start();
