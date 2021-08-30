const { cardsList } = require("../static/play_cards");

// let cardArr = cardsList.filter((item) => item.index > 4);

const getRandomCard = (arr, index, acc = []) => {
  if (index === 0 || arr.length === 0) {
    return [arr, acc];
  }
  const random = Math.floor(Math.random() * arr.length);
  acc = [...acc, arr[random]];
  arr = arr.filter((item, index) => index !== random);
  return getRandomCard(arr, index - 1, acc);
};
const getio = (io) => {
  const rooms = new Map();
  // console.log("maladec")
  io.on("connection", (socket) => {
    // cardArr = cardsList.filter((item) => item.index > 4);
    const cartData = new Map();
    const getNewCards = ({ id, index }) => {
      let [arr1, arr2] = getRandomCard(cartData.get(id), index);
      cartData.set(arr1);
      return arr2;
    };
    socket.on("ROOM:JOIN", ({ roomId, userName }) => {
      cartData.set(
        cartData.get(roomId)
          ? cartData.get(roomId)
          : cardsList.filter((item) => item.index > 4)
      );

      if (!rooms.get(roomId) || rooms.get(roomId).closed === null) {
        const randomCard = getNewCards(roomId, 1);
        // (cards = rooms.get(roomId).cards
        //   ? rooms.get(roomId).cards
        //   : cardsList.filter((item) => item.index > 4)),
        socket.join(roomId);
        if (!rooms.get(roomId)) {
          rooms.set(roomId, {
            open: {
              userName: userName,
              myCard: getNewCards(roomId, 6),
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
              myCard: getNewCards(roomId, 6),
              primary: false,
              random: rooms.get(roomId).open.random[0],
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
      socket.join(roomId);
      cardsData.roomId = getRandomCard(roomId, JSON.parse(amount).index);
      const data = JSON.stringify([
        ...JSON.parse(amount).cardData,
        ...cardsData.roomId,
      ]);
      socket.emit("RECEIVE:CARDS", table.roomId ? data : roomId);
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
