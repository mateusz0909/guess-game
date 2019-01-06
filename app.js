//game starting values
let min = 1,
  max = 10,
  winningNum = generateWinningNum(min, max),
  guessesLeft = 3;
// UI Elements 
const game = document.querySelector('#game'),
  minNum = document.querySelector('.num-min'),
  maxnNum = document.querySelector('.num-max'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');
  winImage = document.querySelector(".win");
  looseImage = document.querySelector(".loose");

//Assign UI min and max
minNum.textContent = min;
maxnNum.textContent = max;

//play again even listener

game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})

//Listen for guess button


guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);
  console.log(winningNum);
  //Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  //Check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct! YOU WIN!`);
    winImage.style.display = 'block';

  } else {
    guessesLeft = guessesLeft - 1;
    if (guessesLeft === 0) {
      //game over
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)
      looseImage.style.display = 'block';
    } else {
      guessInput.value = '';
      //game continues - wrong answer
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
      //change border color
      guessInput.style.borderColor = 'red';
    }
  }
})
//Set message
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

//Game over

function gameOver(won, msg) {
  let color
  won === true ? color = 'green' : color = 'red';
  //Disable input
  guessInput.disabled = true;
  //change border and text color
  guessInput.style.borderColor = color;
  message.style.color = color;
  //set win message
  setMessage(msg);

  //playagain

  guessBtn.value = 'Play Again';
  guessBtn.className = 'play-again'

}

//get winning number

function generateWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}