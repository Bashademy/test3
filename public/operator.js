const socket = io();
const rollButton = document.getElementById('rollButton');
const refreshButton = document.getElementById('refreshButton');
const digit1Element = document.getElementById('digit1');
const digit2Element = document.getElementById('digit2');
const digit3Element = document.getElementById('digit3');

rollButton.addEventListener('click', () => {
  socket.emit('roll');
});

refreshButton.addEventListener('click', () => {
  socket.emit('refresh');
});

socket.on('updateDisplay', ({ digit1, digit2, digit3 }) => {
  updateDigit(digit1Element, digit1);
  updateDigit(digit2Element, digit2);
  updateDigit(digit3Element, digit3);
});

socket.on('resetDisplay', () => {
  digit1Element.innerHTML = 0;
  digit2Element.innerHTML = 0;
  digit3Element.innerHTML = 0;
});

// Function to update the digit display
function updateDigit(digitElement, targetDigit) {
  let currentDigit = 0;
  let startTime = null;
  const interval = setInterval(() => {
    digitElement.textContent = digits[currentDigit];
    currentDigit = (currentDigit + 1) % digits.length;

    if (startTime === null) {
      startTime = new Date().getTime();
    }

    const elapsedTime = new Date().getTime() - startTime;
    if (currentDigit === targetDigit && elapsedTime >= 5000) {
      clearInterval(interval);
    }
  }, 50);
}

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];



