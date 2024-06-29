const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

let gameState = {
  history: [Array(9).fill(null)],
  currentMove: 0,
  xIsNext: true,
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("updateGameState", gameState);

  socket.on("makeMove", (newState) => {
    gameState = newState;
    io.emit("updateGameState", gameState);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log("Listening on *:3001");
});
