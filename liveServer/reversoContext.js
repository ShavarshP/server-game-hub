const { cardsList } = require("../static/play_cards");

let cardArr = cardsList.filter((item) => item.index > 4);

const getRandomCard = (index, acc = []) => {
  if (index === 0 || cardArr == []) {
    return acc;
  }
  const random = Math.floor(Math.random() * cardArr.length);
  acc = [...acc, cardArr[random]];
  cardArr = cardArr.filter((item, index) => index !== random);
  return getRandomCard(index - 1, acc);
};
const getio = (io) => {
  const rooms = new Map();
  // console.log("maladec");
  io.on("connection", (socket) => {
    cardArr = cardsList.filter((item) => item.index > 4);
    socket.on("ROOM:JOIN", ({ roomId, userName }) => {
      try {
        if (!rooms.get(roomId) || rooms.get(roomId).closed === null) {
          socket.join(roomId);
          if (!rooms.get(roomId)) {
            rooms.set(roomId, {
              open: { userName: userName, myCard: getRandomCard(6) },
              closed: null,
            });
          } else {
            rooms.set(roomId, {
              open: rooms.get(roomId).open,
              closed: { userName: userName, myCard: getRandomCard(6) },
            });

            socket.emit(
              "ROOM:SET_USERS",
              JSON.stringify(rooms.get(roomId).open)
            );
          }
          socket.broadcast
            .to(roomId)
            .emit("ROOM:SET_USERS", JSON.stringify(rooms.get(roomId).closed));
        } else {
          socket.emit("ROOM:SET_USERS", "bum chaka-chaka");
        }
      } catch (error) {}
      // rooms[roomId] = [...rooms[roomId], socket.id];
      // const users = [...rooms.get(roomId).get("users").values()];
      // const users = userName;
      // socket.to(roomId).broadcast.emit("ROOM:SET_USERS", users);
      // socket.to(roomId).emit("ROOM:SET_USERS", users);
    });
  });
};
module.exports = getio;
