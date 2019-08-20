//DOM(Document Object Method)
/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, twosix, scoreLimit; //gamePlaying pake StateVariable utk menentukan game true || false

init();

//  Anonymous function = fungsi yg dibuat di callback button, dan tidak bisa di gunakan berkali2
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Random Number
    var dice1 = Math.floor(Math.random() * 6) + 1; //Math.random() + 6 -> rangenya hanya smp angka 6, + 1 -> mulai dari angka 1
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM1 = document.getElementById("dice1");
    diceDOM1.style.display = "block";
    diceDOM1.src = "dice-" + dice1 + ".png";

    var diceDOM2 = document.getElementById("dice2");
    diceDOM2.style.display = "block";
    diceDOM2.src = "dice-" + dice2 + ".png";

    if (dice1 !== 1 && dice2 !== 1) {
      var sum = dice1 + dice2;

      roundScore += sum;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }

    // 3. Update Round score IF the number is not 1
    // if (dice !== 1) {
    //   if (dice === 6) {
    //     twosix += 1;

    //     if (twosix == 2) {
    //       document.querySelector('#score-' + activePlayer).textContent = 0;
    //       scores[activePlayer] = 0;

    //       nextPlayer();
    //     } else {
    //       roundScore += dice;
    //       document.querySelector(
    //         "#current-" + activePlayer
    //       ).textContent = roundScore;
    //     }

    //   } else {
    //     //Add Score
    //     roundScore += dice;
    //     document.querySelector(
    //       "#current-" + activePlayer
    //     ).textContent = roundScore;
    //   }
    // } else {
    //   nextPlayer();
    // }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    var input = document.querySelector(".final-score").value;

    if (input) {
      scoreLimit = input;
    } else {
      scoreLimit = 100;
    }

    //Add Current score to global score
    scores[activePlayer] += roundScore;

    //Update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check Won Player
    if (scores[activePlayer] >= scoreLimit) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice1").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); // Ternary Operator
  roundScore = 0;

  twosix = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Cara sebelum menggunakan toggle
  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");

  //Toggle jika ada class active, dia akan auto remove, atau jika tidak ada class active maka akan ditambahkan
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  // Check if player won the game
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  // twosix = 0;

  document.getElementById("dice1").style.display = "none";
  document.getElementById("dice2").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
}

//Catatan

// // Cara Lain Menggunakan QuerySelector
// var x = document.querySelector("#score-0").textContent; // untuk mendapatkan nilai // Getter
// console.log(x);

// // .textContent hanya bisa set text/plain text, tanpa ada masukkan syntax HTML
// document.querySelector("#current-" + activePlayer).textContent = dice; // setter

//untuk mengakses HTML
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Cara lain menggunakan callback button
// function btn() {
//     //Do Something here
//   }

//   document.querySelector(".btn-roll").addEventListener("click", btn); //('eventMousenya', 'Function Callback')
