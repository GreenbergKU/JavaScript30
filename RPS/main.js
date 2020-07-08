const playOptions = ['ROCK', 'PAPER', 'SCISSORS'];
let userPlay, computer;
let userWins = 0;
let computerWins = 0;
let gameMessage;

document.onload = askGameQuestion();

function askGameQuestion() {  
  document.querySelector(".yes").addEventListener('click', loadGame);
}

function loadGame() {
  document.querySelector("#gameHeader").innerText.includes("ROCK") ? loadFirstRound() : loadAdditionalRound();
}

function loadFirstRound() {
  toggleView(question, choice);
  displayWins();
  document.querySelector(".choice-buttons").addEventListener('click', playGame);  
}

function loadAdditionalRound() {
  toggleView(play, choiceBtns, questionText, playAgainText, question);
  document.querySelector("#gameHeader").innerText = "ROCK PAPER SCISSORS!"; 
  userWins = 0;
  computerWins = 0;
  displayWins();
}

function displayWins() {
  const score = document.querySelector(".score");
  score.firstElementChild.lastElementChild.innerText = userWins;
  score.lastElementChild.lastElementChild.innerText = computerWins;  
}

function toggleView(...views) {
  views.forEach(function(view) {
    view.classList.toggle("hidden");
  });
}

function playGame(event) {
  findUserPlay(event);
  let roundInfo = oneRoundRPS(getComputerPlay(playOptions));
  keepScore(roundInfo);  
}

function keepScore(message) {
  if (!gameMessage.includes("TIE")) {      
    gameMessage.includes("USER") ? userWins++ : computerWins++;
    displayWins();
  };
  userWins === 5 || computerWins === 5 
    ? checkForDraw(userWins, computerWins) : displayPlay(message);
}

function findUserPlay(event) {
  userPlay = event.target.id.toUpperCase();
}

function getComputerPlay(playOptions) { 
  var rpsRandoms = [];       
  var randomIndex;
   for (var i = 0; i < playOptions.length - 1; i++) {
    randomIndex = Math.floor(Math.random() * playOptions.length);
    singleRandomRPS = playOptions[randomIndex];
    rpsRandoms.push(singleRandomRPS);
  };
  return rpsRandoms;
}

function oneRoundRPS(randomOptions) {
  let roundWin, roundWinner, roundLoser, roundInfo;
  computerPlay = randomOptions[0];
  roundWin = computerPlay === userPlay ? `TIE!` 
    : userPlay === 'ROCK' && computerPlay === 'SCISSORS' 
      || userPlay === 'PAPER' && computerPlay === 'ROCK' 
      || userPlay === 'SCISSORS' && computerPlay === 'PAPER' 
    ? "user" : "computer";
  roundLoser = roundWin.includes("user") 
    ? computerPlay : userPlay;
  roundWinner = roundLoser === computerPlay 
    ? userPlay : computerPlay;
  if (roundWin === `TIE!`) {
    gameMessage = "It's a TIE!"
    roundInfo = `Both of you were ${userPlay}!`
  } else {
    gameMessage = `${roundWin.toUpperCase()} WINS THIS ROUND!` 
    roundInfo = `${roundWinner} beats ${roundLoser}!`;    
  };
  return roundInfo;
}

function displayPlay(message) {
  toggleView(play, choiceBtns, nextRound);
  document.querySelector(".user-choice-btn").innerText = userPlay;
  document.querySelector(".computer-choice-btn").innerText = computerPlay;
  document.querySelector("#round-info").innerText = message;
  document.querySelector("#round-outcome").innerText = gameMessage;
  document.querySelector(".round-yes").addEventListener('click', playNextRound);
} 

function displayGameWinner(message) {
  toggleView(play, choiceBtns, question, questionText, playAgainText);
  document.querySelector("#round-info").innerText = message;
  document.querySelector("#round-outcome").innerText = gameMessage;
  document.querySelector("#gameHeader").innerText = "GAME OVER!";
}

function playNextRound() {
  toggleView(play, choiceBtns, nextRound);
}

function checkForDraw(userScore, compScore) {
  userScore === compScore ? playGame() 
    : findGameWinner(userScore, compScore);
}

function findGameWinner(userScore, compScore) {
  let gameWinner, winnerScore, loserScore, gameInfo;
  gameWinner = userScore > compScore ? 'user' : 'computer';
  winnerScore = gameWinner === 'user' ? userScore : compScore;
  loserScore = gameWinner === 'user' ? compScore : userScore;
  gameMessage = `${gameWinner.toUpperCase()} WINS!`;
  gameInfo = `SCORE: ${winnerScore} to ${loserScore}!`;
  displayGameWinner(gameInfo);
}

// function promptPlayAgain() {
//   var playAgainPrompt = prompt("PLAY AGAIN?? click OK to CONTINUE, click CANCEL to EXIT GAME", "type YES to continue or NO to exit game");
//   if (playAgainPrompt !== null) {
//   userPlay = playAgainPrompt.toUpperCase() !== "NO" ?
//     userPlay === "YES" || "" ? loadGame() : null : null;
//   };
// }

  
// console.log(
//   'roundWin, roundWinner, roundLoser: ', 
//   roundWin, roundWinner, roundLoser
// );
// console.log(
//   'gameMessage, roundInfo: ',
//   gameMessage, roundInfo
// );


// function tieBreakRound(userScore, compScore) {
//   playGame();
//   if (!gameMessage.includes("TIE")) {         
//     gameMessage.includes("User") ? userScore++ : compScore++;
//   };  
//   checkForDraw(userScore, compScore);
// }

  // userScore === compScore ? tieBreakRound(userScore, compScore)

// choiceBtns, questionText, playAgainText
// document.querySelector("#gameHeader").innerText = "ROCK PAPER SCISSORS!"

// console.log('userPlay: ', userPlay);

// console.log('viewId: ', viewId);
// console.log('views: ', views);

// document.querySelector(".choice-buttons").addEventListener('click', playGame);

// choiceBtns, questionText, playAgainText