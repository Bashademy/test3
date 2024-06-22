const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static('public'));

// Set to store the previously generated numbers
const previouslyGeneratedNumbers = new Set();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('roll', () => {
    const randomNumber = generateRandomNumber();
    io.emit('updateDisplay', randomNumber); 
  });

  socket.on('refresh', () => {
    io.emit('resetDisplay', 0);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const generateRandomNumber = () => {
  // Array of digits to simulate the rolling effect
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let digit1, digit2, digit3;
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * 810) + 1;
    digit1 = Math.floor(randomNumber / 100);
    digit2 = Math.floor((randomNumber % 100) / 10);
    digit3 = randomNumber % 10;
  } while (previouslyGeneratedNumbers.has(randomNumber));

  previouslyGeneratedNumbers.add(randomNumber);

  return { digit1, digit2, digit3 };
};

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});









