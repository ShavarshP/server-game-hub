const chessIo = (io) => {
  const rooms = new Map();
  io.on("connection", (socket) => {
    socket.on("ROOM:JOIN_CHESS", ({ roomId, userName }) => {
      try {
        if (!rooms.get(roomId) || rooms.get(roomId).black === null) {
          socket.join(roomId);
          if (!rooms.get(roomId)) {
            rooms.set(roomId, {
              white: {
                userName: userName,
                colour: "white",
              },
              black: null,
            });
          } else {
            rooms.set(roomId, {
              white: rooms.get(roomId).white,
              black: {
                userName: userName,
                colour: "black",
              },
            });

            socket.emit(
              "ROOM:SET_USERS_CHESS",
              JSON.stringify(rooms.get(roomId).white)
            );
          }
          socket.broadcast
            .to(roomId)
            .emit(
              "ROOM:SET_USERS_CHESS",
              JSON.stringify(rooms.get(roomId).black)
            );
        } else {
          socket.emit("ROOM:SET_USERS_CHESS", "bum chaka-chaka");
        }
      } catch (error) {}
    });
    const table = {};
    socket.on("TABLE:DATA_CHESS", ({ roomId, tableData }) => {
      try {
        socket.join(roomId);
        table.roomId = {
          data: JSON.parse(tableData),
        };
        socket.emit(
          "TABLE:DATA_CHESS",
          table.roomId ? JSON.stringify(table.roomId) : roomId
        );
        socket.broadcast
          .to(roomId)
          .emit(
            "TABLE:DATA_CHESS",
            table.roomId ? JSON.stringify(table.roomId) : roomId
          );
      } catch (error) {}
    });
  });
};

module.exports = chessIo;
