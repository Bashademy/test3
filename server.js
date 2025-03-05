const express = require("express");
const app = express();
const http = require("http");
const server = app.listen(3000);
const { Server } = require("socket.io");
const { createServer } = require("http");

console.log(`Server is running on port 3000`);
const socket = require("socket.io");

const path = require("path");

app.use(express.static("public"));

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5500",
    // or with an array of origins
    // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
    credentials: true,
  },
});

// Set to store the previously generated numbers
const previouslyGeneratedNumbers = new Set();

// io.sockets.on("connection", newConnection);

// function newConnection(socket) {
//   console.log("New connection: " + socket.id);
// }

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("roll", () => {
    console.log("Rolling the number");
    const randomNumber = generateRandomNumber();
    console.log(randomNumber);
    io.emit("updateDisplay", randomNumber);
  });

  socket.on("refresh", () => {
    io.emit("resetDisplay", 0);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const generateRandomNumber = () => {
  // Array of digits to simulate the rolling effect
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let digit1, digit2, digit3;
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * 240) + 1;
    digit1 = Math.floor(randomNumber / 100);
    digit2 = Math.floor((randomNumber % 100) / 10);
    digit3 = randomNumber % 10;
  } while (previouslyGeneratedNumbers.has(randomNumber));

  previouslyGeneratedNumbers.add(randomNumber);

  return { digit1, digit2, digit3 };
};

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
