const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);
Http.listen(3000, () => {
  console.log("Server is running");
});

function user(id, userName) {
  this.id = id;
  this.userName = userName;
  this.stillGuessing = false;
}

function roomData (players) {
  this.players = players;
  this.peopleGuessing = 0;
  this.currentWord = "";
  this.timeLeft = -1; // TODO has no function yet
}

function findPlayerByName (room, name) {
  var players = rooms.get(room).players;
  var playerIndex = -1;
  var nameBuffer = name; // use buffers, because the string comparison fails otherwise 
    for (let i = 0; i < players.length; i++) {
      var nameBuffer2 = players[i].userName; // use buffers, because the string comparison fails otherwise 
      if (nameBuffer.localeCompare(nameBuffer2) == 0){
        // find the player by userName
        // console.log("userName: " + userName + " = players[i].userName: " + players[i].userName);
        playerIndex = i;
        break;
      }
    }
  return playerIndex;  
}

function startGame (room) {
  var players = rooms.get(room).players;
  // select Player to draw
  var playerIndex = Math.floor(Math.random() * players.length); // get player, who has to draw
  var wordIndex = Math.floor(Math.random() * words.length); // get random word
  rooms.get(room).currentWord = words[wordIndex];
  rooms.get(room).peopleGuessing = players.length - 1;

  console.log("-----------------------------------------");
  console.log("Game Started!")
  console.log("Number of Players in room: " + players.length);
  console.log("Selected Player to draw: " + players[playerIndex].userName);

  Socketio.in(room).emit("clearCanvas"); // new drawing -> clear canvas for everybody in the room
  for (let i = 0; i < players.length; i++){
    // get random player
    if (i == playerIndex){
      // this player has to draw
      players[i].stillGuessing = false; // player who draws doesn't guess
      Socketio.to(players[i].id).emit("new message", {
        user: "Server",
        message: "Your word is: " + words[wordIndex],
      });
      Socketio.to(players[i].id).emit("enableDrawing", true);
    } else {
      players[i].stillGuessing = true; // these players have to guess
      Socketio.to(players[i].id).emit("new message", {
        user: "Server",
        message: "It is your time to guess!",
      });
      Socketio.to(players[i].id).emit("enableDrawing", false);
    }
  }
}

function checkIfRoundIsOver(room) {
  if (rooms.get(room).peopleGuessing <= 0) {
    // round is over -> broadcast to players
    Socketio.in(room).emit("new message", {
      user: "Server",
      message: "Round is over!",
    });
    // reset values
    rooms.get(room).timeLeft = -1; // reset time; TODO time has no function yet
    rooms.get(room).currentWord = ""; // reset word
  }
}

let words = ["apple", "bird", "city", "anger", "shower"]; // TODO add words, maybe read that stuff from another file
let rooms = new Map();

Socketio.on("connection", (socket) => {
  socket.on("newPlayer", (userName, room) => {
    socket.join(room);

    player = new user(socket.id, userName);
    if (rooms.has(room)){
      // room already exists -> add player
      rooms.get(room).players.push(player);
    } else {
      // room does not exists -> create room and add player
      var players = [];
      players.push(player);
      rooms.set(room, new roomData(players));
    }
  });

  socket.on("startGame", (room) => {
    var players = rooms.get(room).players;
    if (players.length < 2) {
      // doesn't make sense to play this game alone -> just return
      Socketio.in(room).emit("new message", {
        user: "Server",
        message: "Not enough players to start!",
      });
      return;
    }
    Socketio.in(room).emit("new message", {
      user: "Server",
      message: "Game has started",
    });

    startGame (room);
  });
  
  socket.on("draw", (posX, posY, room) => {
    Socketio.in(room).emit("update canvas", {
      posX: posX,
      posY: posY,
    });
  });

  socket.on("join", (userName, room) => {
    //socket.join(room); // already joining on new Player TODO decide which one is used 
    console.log(userName + " joined the room " + room);
    socket.broadcast.to(room).emit("new user joined", {
      user: "Server",
      message: userName + " has joined the room!",
    });
  });

  socket.on("leave", (userName, room) => {
    console.log(userName + " has left the room " + room);
    socket.broadcast.to(room).emit("left room", {
      user: "Server",
      message: userName + " has left the room...",
    });
    
    var toRemoveIndex = findPlayerByName(room, userName); // find player that needs to be removed
    if (rooms.get(room).players[toRemoveIndex].stillGuessing) {
      rooms.get(room).players[toRemoveIndex].stillGuessing = false; // might still join another room -> better reset
      rooms.get(room).peopleGuessing--;
      checkIfRoundIsOver(room);
    }
    var bufferedPlayers = rooms.get(room).players.splice(toRemoveIndex, 1); // remove the player from array and store new list in buffer
    rooms.get(room).players = bufferedPlayers; // overwrite old array with new one

    socket.leave(room); // TODO notify others? Only removes current client from server, but client can still type and other can see it
    // socket.disconnect(false);
  });

  socket.on("message", (userName, room, messageText) => {
    // check if the message contains the right word
    if (rooms.get(room).currentWord != "" && messageText.includes((rooms.get(room).currentWord))){
      Socketio.in(room).emit("new message", {
        user: "Server",
        message: userName + " guessed the correct word!",
      });
      var playerIndex = findPlayerByName(room, userName);
      rooms.get(room).players[playerIndex].stillGuessing = false;
      rooms.get(room).peopleGuessing--;
      checkIfRoundIsOver(room);
    } else {
      Socketio.in(room).emit("new message", {
        user: userName,
        message: messageText,
      });
    }
  });
});


