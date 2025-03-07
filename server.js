const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app); // Use the same server instance
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

// Socket connection
io.on("connection", (socket) => {
  // Send the current number when a user connects
  socket.on("roll", () => {
    const randomNumber = generateRandomNumber();
    io.emit("updateNumber", randomNumber);
  });

  socket.on("refresh", () => {
    io.emit("resetDisplay", 0);
  });

  socket.on("disconnect", () => {});
});

const previouslyGeneratedNumbers = new Set();
const generateRandomNumber = () => {
  // Array of digits to simulate the rolling effect

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

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  // Use the 'server' variable here
  console.log(`Server is running on port ${PORT}`);
});
