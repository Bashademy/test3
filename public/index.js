//const socket = io();
const rollButton = document.getElementById("rollButton");
const refreshButton = document.getElementById("refreshButton");
const digit1Element = document.getElementById("digit1");
const digit2Element = document.getElementById("digit2");
const digit3Element = document.getElementById("digit3");

rollButton.addEventListener("click", () => {
  generateRandomNumber();
});

refreshButton.addEventListener("click", () => {
  digit1Element.innerHTML = 0;
  digit2Element.innerHTML = 0;
  digit3Element.innerHTML = 0;
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
  updateDigit(digit1Element, digit1, digits1);
  updateDigit(digit2Element, digit2, digits2);
  updateDigit(digit3Element, digit3, digits3);
};

// Function to update the digit display
function updateDigit(digitElement, targetDigit, digits, digitInterval = 150) {
  let currentDigit = 0;
  let startTime = null;
  let lastDigitChangeTime = null;

  function animate(time) {
    if (!startTime) {
      startTime = time;
      lastDigitChangeTime = time;
    }

    const elapsedTime = time - startTime;
    const timeSinceLastDigitChange = time - lastDigitChangeTime;

    // Check if it's time to change to the next digit
    if (timeSinceLastDigitChange >= digitInterval) {
      digitElement.textContent = digits[currentDigit];
      currentDigit = (currentDigit + 1) % digits.length;
      lastDigitChangeTime = time;
    }

    // Continue animation if less than 5 seconds have passed or if the current digit is not the target digit
    if (elapsedTime < 5000 || currentDigit !== targetDigit) {
      requestAnimationFrame(animate);
    } else {
      // Ensure the final digit is correct
      digitElement.textContent = targetDigit;
    }
  }

  requestAnimationFrame(animate);
}

const digits1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const digits2 = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const digits3 = [5, 4, 3, 2, 1, 0, 9, 8, 7, 6];
