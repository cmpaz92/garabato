const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

var position = {
  x: 100,
  y: 400,
};

const plyers = [];

Socketio.on("connection", (socket) => {
  socket.emit("position", position);
  socket.on("move", (data) => {
    if (data === "left") {
      position.x = position.x - 20;
      Socketio.emit("position", position);
    }
    if (data === "right") {
      position.x = position.x + 20;
      Socketio.emit("position", position);
    }
    if (data === "up") {
      position.y = position.y - 20;
      Socketio.emit("position", position);
    }
    if (data === "down") {
      position.y = position.y + 20;
      Socketio.emit("position", position);
    }
  });
});

Http.listen(3000, () => {
  console.log("Server is runnnnning");
});
