const { cardsList } = require("../static/play_cards");

let cardArr = cardsList.filter((item) => item.index > 4);

const getio = (io) => {
  const rooms = new Map();
  const allCards = new Map();
  const getRandomCard = (index, acc = [], id) => {
    try {
      if (index === 0 || allCards.get(id) == []) {
        return acc;
      }
      const random = Math.floor(Math.random() * allCards.get(id).length);
      acc = [...acc, allCards.get(id)[random]];
      const newArr = allCards.get(id).filter((item, index) => index !== random);
      allCards.set(id, newArr);
      return getRandomCard(index - 1, acc, id);
    } catch (error) {
      return { data: error };
    }
  };
  // console.log("maladec")
  io.on("connection", (socket) => {
    cardArr = cardsList.filter((item) => item.index > 4);
    socket.on("ROOM:JOIN", ({ roomId, userName }) => {
      if (!rooms.get(roomId) || rooms.get(roomId).closed === null) {
        socket.join(roomId);
        if (!rooms.get(roomId)) {
          allCards.set(roomId, cardArr);
          const randomCard = getRandomCard(1, [], roomId);
          rooms.set(roomId, {
            open: {
              userName: userName,
              myCard: getRandomCard(6, [], roomId),
              primary: true,
              random: randomCard[0],
            },
            closed: null,
            tableData: null,
          });
        } else {
          rooms.set(roomId, {
            open: rooms.get(roomId).open,
            closed: {
              userName: userName,
              myCard: getRandomCard(6, [], roomId),
              primary: false,
              random: rooms.get(roomId).open.random,
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
      table.roomId = {
        data: JSON.parse(tableData),
        // index: [
        //   rooms.get(roomId).closed.myCard.length,
        //   rooms.get(roomId).open.myCard.length,
        // ],
      };
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
      try {
        socket.join(roomId);
        cardsData.roomId = getRandomCard(JSON.parse(amount).index, [], roomId);
        const data = JSON.stringify(cardsData.roomId);
        socket.emit("RECEIVE:CARDS", table.roomId ? data : roomId);
      } catch (error) {}
      // socket.broadcast
      //   .to(roomId)
      //   .emit(
      //     "RECEIVE:CARDS_LENGTH",
      //     table.roomId ? JSON.parse(data).length : roomId
      //   );
    });
  });
};
module.exports = getio;
