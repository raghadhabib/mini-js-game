let secretNumber = Math.floor(Math.random() * 10) + 1;
let attemptsLeft = 3;
let won = false;

function checkGuess() {
  let userInput = document.getElementById("guessInput").value;
  let guess = Number(userInput);
  const message = document.getElementById("message");
  const attempts = document.getElementById("attempts");

  if (won || attemptsLeft <= 0) return;

  if (guess === secretNumber) {
    message.textContent = `🎉 Congratulations! The number was ${secretNumber}`;
    won = true;
  } else if (guess > secretNumber) {
    message.textContent = "Too high!";
  } else {
    message.textContent = "Too low!";
  }

  attemptsLeft--;

  if (!won && attemptsLeft === 0) {
    message.textContent = `❌ You lost! The number was ${secretNumber}`;
  }

  attempts.textContent = `Attempts left: ${attemptsLeft}`;
}
