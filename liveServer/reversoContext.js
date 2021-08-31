const { getRandomCard, newArrCards } = require("../game_func/reversContext");
const { cardsList } = require("../static/play_cards");

let cardArr = cardsList.filter((item) => item.index > 4);

const getio = (io) => {
  const rooms = new Map();
  const allCards = new Map();

  io.on("connection", (socket) => {
    cardArr = cardsList.filter((item) => item.index > 4);
    socket.on("ROOM:JOIN", ({ roomId, userName }) => {
      if (!rooms.get(roomId) || rooms.get(roomId).closed === null) {
        socket.join(roomId);
        if (!rooms.get(roomId)) {
          allCards.set(roomId, cardArr);

          const randomCard = getRandomCard(1, [], allCards.get(roomId));
          rooms.set(roomId, {
            open: {
              userName: userName,
              myCard: getRandomCard(6, [], allCards.get(roomId)),
              primary: true,
              random: null,
            },
            closed: null,
            tableData: null,
          });
        } else {
          let newArrCardsData = newArrCards(
            rooms.get(roomId).open.myCard,
            allCards.get(roomId)
          );
          let myCard = getRandomCard(6, [], newArrCardsData);
          newArrCardsData = newArrCards(myCard, newArrCardsData);
          let random = getRandomCard(1, [], newArrCardsData);
          newArrCardsData = newArrCards(random, newArrCardsData);
          rooms.set(roomId, {
            open: rooms.get(roomId).open,
            closed: {
              userName: userName,
              myCard: myCard,
              primary: false,
              random: random,
            },
            tableData: null,
            allCards: newArrCardsData,
          });
          rooms.get(roomId).open.random = random;

          socket.emit("ROOM:SET_USERS", JSON.stringify(rooms.get(roomId).open));
          socket.emit(
            "ROOM:SET_USERS_CARDS",
            JSON.stringify(rooms.get(roomId).allCards)
          );
        }
        socket.broadcast
          .to(roomId)
          .emit("ROOM:SET_USERS", JSON.stringify(rooms.get(roomId).closed));
        socket.broadcast
          .to(roomId)
          .emit(
            "ROOM:SET_USERS_CARDS",
            JSON.stringify(rooms.get(roomId).allCards)
          );
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

    socket.on("RECEIVE:CARDS", ({ roomId, amount, allCards }) => {
      try {
        let cards = JSON.parse(allCards);
        socket.join(roomId);
        cardsData.roomId = getRandomCard(JSON.parse(amount).index, [], cards);

        const data = JSON.stringify([
          ...JSON.parse(amount).cardData,
          ...cardsData.roomId,
        ]);
        cards = newArrCards(cardsData.roomId, cards);
        socket.emit("RECEIVE:CARDS", table.roomId ? data : roomId);
        socket.emit("ROOM:SET_USERS_CARDS", JSON.stringify(cards));
        socket.broadcast
          .to(roomId)
          .emit("ROOM:SET_USERS_CARDS", JSON.stringify(cards));
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
