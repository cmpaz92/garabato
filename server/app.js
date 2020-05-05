const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);
Http.listen(3000, () => {
  console.log("Server is runnnnning");
});

// const express = require("express");
// const app = express();
// const server = app.listen(3000, () => {
//   console.log("Server serving!");
// });
// app.use(express.static("public"));

var position = {
  x: 100,
  y: 400,
};

const plyers = [];

Socketio.on("connection", (socket) => {
  console.log("hi", socket.id);

  socket.on("join", (data) => {
    socket.join(data.room);
    console.log(data.user + " joined the room " + data.room);
    socket.broadcast.to(data.room).emit("new user joined", {
      user: data.user,
      message: "joined!",
    });
  });

  socket.on("leave", (data) => {
    console.log(data.user + " has left the room " + data.room);
    socket.broadcast.to(data.room).emit("left room", {
      user: data.user,
      message: " left",
    });
    socket.leave(data.room);
  });

  socket.on("message", (data) => {
    Socketio.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
    });
  });

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
