'use strict';

// Selecting Elements
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // only passing by ID(faster)

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

// Initialization function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Function for switching player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Display dice roll

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // selects the different image

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Hold Button
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      // Change Player to Winner TODO

      // Change to winner template
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3.If not switch player
      switchPlayer();
    }
  }
});

// Reset Button
btnNew.addEventListener('click', init);

//   // 1.Set all scored to 0
//   //   scores[0] = 0;
//   //   document.getElementById(`score--${0}`).textContent = scores[0];
//   //   scores[1] = 0;
//   //   document.getElementById(`score--${1}`).textContent = scores[1];
//   scores = [0, 0];
//   score0El.textContent = 0;
//   score1El.textContent = 0;

//   currentScore = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;

//   // 2.Set the game to playing mode
//   if (playing === false) {
//     playing = true;
//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.remove('player--winner');
//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.add('player--active');
//   }

//   // 3.Set player 1 as starting player
//   if (activePlayer !== 0) switchPlayer();