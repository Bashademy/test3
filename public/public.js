const socket = io("http://localhost:5000/");
const digit1Element = document.getElementById("digit1");
const digit2Element = document.getElementById("digit2");
const digit3Element = document.getElementById("digit3");

socket.on("updateNumber", (number) => {
  updateDigit(digit1Element, number.digit1, digits1);
  updateDigit(digit2Element, number.digit2, digits2);
  updateDigit(digit3Element, number.digit3, digits3);
});

socket.on("resetDisplay", (number) => {
  digit1Element.innerHTML = number;
  digit2Element.innerHTML = number;
  digit3Element.innerHTML = number;
});

// Function to update the digit display
function updateDigit(digitElement, targetDigit, digits, digitInterval = 60) {
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

    // Continue animation if less than 15 seconds have passed or if the current digit is not the target digit
    if (elapsedTime < 15000 || currentDigit !== targetDigit) {
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
