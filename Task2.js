let secretNumber = Math.floor(Math.random() * 10) + 1;
let attemptsLeft = 3;
let won = false;

// for timer 
let timerValue = 5; 
let timerInterval;  
let inputLocked = false; 


// function checkGuess() {
// if (timerValue > 0) return;
// 1
// clearInterval(timerInterval);
// inputLocked = false;


//   let userInput = document.getElementById("guessInput").value;
//   let guess = Number(userInput);
//   const message = document.getElementById("message");
//   const attempts = document.getElementById("attempts");

//   if (won || attemptsLeft <= 0) return;

//   if (guess === secretNumber) {
//     message.textContent = `🎉 Congratulations! The number was ${secretNumber}`;
//     won = true;
//   } else if (guess > secretNumber) {
//     message.textContent = "Too high!";
//   } else {
//     message.textContent = "Too low!";
//   }

//   attemptsLeft--;

//   if (!won && attemptsLeft === 0) {
//     message.textContent = `❌ You lost! The number was ${secretNumber}`;
//   }

//   attempts.textContent = `Attempts left: ${attemptsLeft}`;
//   clearInterval(timerInterval);
//   inputLocked = false;

// }

function submitGuess() {
  if (inputLocked || attemptsLeft === 0 || won) return;

  clearInterval(timerInterval);
  inputLocked = true;

  let userInput = document.getElementById("guessInput").value;
  let guess = Number(userInput);
  const message = document.getElementById("message");
  const attempts = document.getElementById("attempts");

  if (guess === secretNumber) {
    message.textContent = `🎉 Congratulations! The number was ${secretNumber}`;
    document.getElementById("successSound").play(); 
    won = true;
    document.getElementById("guessInput").disabled = true;
    document.querySelector(".testBtn").disabled = true;
  } else if (guess > secretNumber) {
    message.textContent = "Too high!"+secretNumber;
  } else {
    message.textContent = "Too low!"+secretNumber;
  }

  attemptsLeft--;
  attempts.textContent = `Attempts left: ${attemptsLeft}`;

  if (!won && attemptsLeft === 0) {
    message.textContent = `❌ You lost! The number was ${secretNumber}`;
    document.getElementById("guessInput").disabled = true;
    document.querySelector(".testBtn").disabled = true;
  }

  inputLocked = false;
  document.getElementById("guessInput").value = "";

  if (!won && attemptsLeft > 0) {
    startAttemptTimer(); // نبدأ التايمر للمحاولة التالية
  }
}



function TryAgain(){
  attemptsLeft = 3;
  won = false;
  secretNumber = Math.floor(Math.random() * 10) + 1;
  document.getElementById("message").textContent = "";
  document.getElementById("attempts").textContent= "";
  document.getElementById("guessInput").value = "";
   document.getElementById("timer").textContent = "";

  clearInterval(timerInterval);
  startAttemptTimer();

}

function startAttemptTimer() {
  clearInterval(timerInterval);
  timerValue = 5;
  document.getElementById("timer").textContent = `⏱️ Time left: ${timerValue}s`;

  timerInterval = setInterval(() => {
    timerValue--;
    document.getElementById("timer").textContent = `⏱️ Time left: ${timerValue}s`;

    if (timerValue <= 0) {
      clearInterval(timerInterval);
      inputLocked = true;
      attemptsLeft--;

      document.getElementById("message").textContent = `⌛ Time's up! You missed this attempt.`;
      document.getElementById("attempts").textContent = `Attempts left: ${attemptsLeft}`;
      document.getElementById("timesupSound").play();

      if (attemptsLeft === 0) {
        document.getElementById("message").textContent += ` ❌ You lost! The number was ${secretNumber}`;
        document.getElementById("guessInput").disabled = true;
        document.querySelector(".testBtn").disabled = true;
      }

      inputLocked = false;
      document.getElementById("guessInput").value = "";
    }
  }, 1000);
}

window.onload = function () {
  startAttemptTimer();
};
