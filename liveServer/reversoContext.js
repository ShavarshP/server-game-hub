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
      if (!rooms.get(roomId) || rooms.get(roomId).closed === null) {
        socket.join(roomId);
        if (!rooms.get(roomId)) {
          rooms.set(roomId, {
            open: {
              userName: userName,
              myCard: getRandomCard(6),
              primary: true,
            },
            closed: null,
            tableData: null,
          });
        } else {
          rooms.set(roomId, {
            open: rooms.get(roomId).open,
            closed: {
              userName: userName,
              myCard: getRandomCard(6),
              primary: false,
            },
            tableData: null,
          });

          socket.emit("ROOM:SET_USERS", JSON.stringify(rooms.get(roomId).open));
        }
        socket.broadcast
          .to(roomId)
          .emit("ROOM:SET_USERS", JSON.stringify(rooms.get(roomId).closed));
      } else {
        socket.emit("ROOM:SET_USERS", "bum chaka-chaka");
      }
    });
    const table = {};
    socket.on("TABLE:DATA", ({ roomId, tableData }) => {
      socket.join(roomId);
      table.roomId = { data: JSON.parse(tableData) };
      socket.emit(
        "TABLE:DATA",
        table.roomId ? JSON.stringify(table.roomId) : roomId
      );
      socket.broadcast
        .to(roomId)
        .emit(
          "TABLE:DATA",
          table.roomId ? JSON.stringify(table.roomId) : roomId
        );
    });
    const cardsData = {};

    socket.on("RECEIVE:CARDS", ({ roomId, amount }) => {
      socket.join(roomId);
      cardsData.roomId = getRandomCard(JSON.parse(amount).index);
      socket.emit(
        "RECEIVE:CARDS",
        table.roomId ? JSON.stringify(cardsData.roomId) : roomId
      );
    });
  });
};
module.exports = getio;
