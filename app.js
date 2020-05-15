const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);
Http.listen(3000, () => {
  console.log("Server is running");
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

const players = [];

function Player(id, user, room, x, y) {
  this.id = id;
  this.user = user;
  this.romm = room;
  this.x = x;
  this.y = y;
}

// setInterval(heartbeat, 3000);

// function heartbeat() {
//   Socketio.emit("heartbeat", players);
// }

Socketio.on("connection", (socket) => {
  socket.on("newPlayer", (data) => {
    socket.join(data.room);
    player = new Player(socket.id, data.user, data.room, data.x, data.y);
    players.push(player);

    Socketio.emit("createPlayer", players);
    console.log(players);
    console.log(socket.id);
    socket.broadcast.to(data.room).emit("showNewPlayer", players);
  });

  socket.on("move", (data) => {
    var rect;
    for (var i = 0; i < players.length; i++) {
      if (socket.id === players[i].id) {
        rect = players[i];
        rect.x = data.x;
        rect.y = data.y;
      }
    }
  });

  socket.on("update", (data) => {
    console.log(
      socket.id + " " + data.x + " " + data.y + " " + data.w + " " + data.h
    );
    var rect;
    for (var i = 0; i < rect.length; i++) {
      if (socket.id === players[i].id) {
        rect = players[i];
      }
    }

    rect.x = data.x;
    rect.y = data.y;
    rect.w = data.w;
    rect.h = data.h;
    // player = new Player(socket.id, data.x, data.y, data.w, data.h);
    // players.push(player);
  });

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
    Socketio.emit("deletePlayer", players);
  });

  socket.on("message", (data) => {
    Socketio.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
    });
  });
});
