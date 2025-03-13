(function () {
  'use strict';
  console.log('reading js');

  //vegas audio
  const vegas = new Audio('audio/vegas.wav');

  //winning audio
  const winning = new Audio('audio/gamewin.wav');

  //   losing audio
  const losing = new Audio('audio/losing.wav');

  //diceroll audio
  const diceroll = new Audio('audio/diceroll.mp3');

  //Main screen selectors
  const startScreen = document.querySelector('.start-screen');
  const rulesScreen = document.querySelector('.rules-screen');
  const gameScreen = document.querySelector('.game-screen');

  //Main button selectors
  const startButton = document.querySelector('#start-button');
  const playButton = document.querySelector('#play-button');
  const rollButton = document.querySelector('#roll-button');
  const passButton = document.querySelector('#pass-button');
  const resetButton = document.querySelector('#reset-button');

  //Game message
  const gameMessage = document.querySelector('.game-message');

  //dice
  const dealerDice1 = document.querySelector('#dealer-dice-1');
  const dealerDice2 = document.querySelector('#dealer-dice-2');

  const playerDice1 = document.querySelector('#player-dice-1');
  const playerDice2 = document.querySelector('#player-dice-2');

  //score
  const dealerScore = document.querySelector('.dealer-score');
  const playerScore = document.querySelector('.player-score');

  //headings
  const playerHeading = document.querySelector('#player-heading');
  const dealerHeading = document.querySelector('#dealer-heading');

  //Game Data
  const gameData = {
    dice: [
      'die_1.svg',
      'die_2.svg',
      'die_3.svg',
      'die_4.svg',
      'die_5.svg',
      'die_6.svg',
    ],
    players: ['Dealer', 'Player'],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
    gameEnd: 29,
  };

  function setUpTurn() {
    //if its the players turn
    if (gameData.index === 1) {
      //add turn message
      gameMessage.innerHTML = `Roll the dice for ${
        gameData.players[gameData.index]
      }`;

      //enable the buttons
      console.log('Players turn, enabling Buttons');
      rollButton.disabled = false;
      passButton.disabled = false;

      //change font size
      playerHeading.classList.remove('font-32');
      playerHeading.classList.add('font-48');
      dealerHeading.classList.add('font-32');
      dealerHeading.classList.remove('font-48');
    } else {
      //add turn message
      gameMessage.innerHTML = `Rolling the dice for ${
        gameData.players[gameData.index]
      }`;
      //disable the buttons
      console.log('dealers turn');
      rollButton.disabled = true;
      passButton.disabled = true;

      //change font size
      //change font size
      playerHeading.classList.add('font-32');
      playerHeading.classList.remove('font-48');
      dealerHeading.classList.remove('font-32');
      dealerHeading.classList.add('font-48');

      //The dealer is the computer, it will randomly roll or pass.
      //The dealer has a 80% chance to roll and 20% chance to pass.

      const chance = Math.random();

      if (chance <= 0.8) {
        console.log('Dealer decided to play again!');
        setTimeout(throwDice, 2000);
      } else {
        console.log('Dealer decided to pass');
        gameMessage.innerHTML = 'Dealer decided to pass to the player';
        setTimeout(passTurn, 2000);
      }
    }
  }

  function showCurrentScore() {
    console.log(`Player: ${gameData.score[1]} | Dealer: ${gameData.score[0]}`);
    dealerScore.innerHTML = `${gameData.score[0]}`;
    playerScore.innerHTML = `${gameData.score[1]}`;
  }

  function throwDice() {
    //play dice roll
    diceroll.play();

    //disable the buttons
    rollButton.disabled = true;
    passButton.disabled = true;

    console.log('Throwing Dice');
    gameData.roll1 = Math.floor(Math.random() * 6) + 1;
    gameData.roll2 = Math.floor(Math.random() * 6 + 1);
    console.log(`Rolled ${gameData.roll1} and ${gameData.roll2}`);

    //set the rolled dice based on turn
    if (gameData.index === 0) {
      gameMessage.innerHTML = `Dealer rolled a ${gameData.roll1} and a ${gameData.roll2}`;
      dealerDice1.src = `images/${gameData.dice[gameData.roll1 - 1]}`;
      dealerDice2.src = `images/${gameData.dice[gameData.roll2 - 1]}`;
    } else {
      gameMessage.innerHTML = `Player rolled a ${gameData.roll1} and a ${gameData.roll2}`;
      playerDice1.src = `images/${gameData.dice[gameData.roll1 - 1]}`;
      playerDice2.src = `images/${gameData.dice[gameData.roll2 - 1]}`;
    }

    gameData.rollSum = gameData.roll1 + gameData.roll2;

    //if two 1's are rolled
    if (gameData.rollSum === 2) {
      console.log('snake eyes!');
      gameMessage.innerHTML = 'Oh no! Snake eyes!';
      // zero out the score
      gameData.score[gameData.index] = 0;
      // switch player using ternary operator
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      //we will add showCurrentScore() function here
      showCurrentScore();
      // wait 2 seconds
      setTimeout(setUpTurn, 2000);
    }

    //if either die is a 1
    else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
      console.log('one of the two dice rolled a 1');
      gameMessage.innerHTML = `One of the rolls was a one, switching over to ${
        gameData.players[gameData.index ? 0 : 1]
      }`;
      //wait 2 seconds
      setTimeout(passTurn, 2000);
    }

    //if neither die is a 1
    else {
      console.log('neither dice rolled a 1. the game continues.');
      // update score
      gameData.score[gameData.index] =
        gameData.score[gameData.index] + gameData.rollSum;
      showCurrentScore();
      setTimeout(checkWinningCondition, 2000);
    }
  }

  function passTurn() {
    console.log('Passing Turn');
    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    setUpTurn();
  }

  // check winning condition will be added here
  function checkWinningCondition() {
    console.log('checking win condition');
    if (gameData.score[gameData.index] > gameData.gameEnd) {
      console.log(`Game won by ${gameData.players[gameData.index]}`);

      //   play winning audio if player is the winner
      if (gameData.index == 1) {
        winning.play();
      } else {
        losing.play();
      }
      gameMessage.innerHTML = ` ${gameData.players[gameData.index]} wins with ${
        gameData.score[gameData.index]
      } points!`;

      rollButton.classList.add('none');
      passButton.classList.add('none');
      resetButton.classList.remove('none');

      resetButton.addEventListener('click', function () {
        //reset game data
        gameData.index = 0;
        gameData.roll1 = 0;
        gameData.roll2 = 0;
        gameData.score = [0, 0];
        gameData.rollSum = 0;

        //reset dice
        dealerDice1.src = 'images/die_1.svg';
        dealerDice2.src = 'images/die_1.svg';
        playerDice1.src = 'images/die_1.svg';
        playerDice2.src = 'images/die_1.svg';

        //reset the buttons
        rollButton.classList.remove('none');
        passButton.classList.remove('none');
        resetButton.classList.add('none');

        //call check score
        showCurrentScore();

        //reset game message
        gameMessage.innerHTML = 'Are you ready to play?';

        //reset all audio
        losing.pause();
        losing.currentTime = 0;

        winning.pause();
        winning.currentTime = 0;

        setTimeout(setUpTurn, 2000);
      });
    } else {
      // show current score function here
      console.log('Game hasnt ended, continue');
      showCurrentScore();
      setUpTurn();
    }
  }

  //Show rules screen on start button click
  startButton.addEventListener('click', function () {
    startScreen.classList.add('none');
    rulesScreen.classList.remove('none');
  });

  //Show games screen on play button click
  playButton.addEventListener('click', function () {
    //fade background music
    vegas.volume = 0.1;
    vegas.play();

    rulesScreen.classList.add('none');
    gameScreen.classList.remove('none');

    //wait 2 seonds before showing its the dealers turn first
    setTimeout(setUpTurn, 2000);
  });

  //Roll dice for player
  rollButton.addEventListener('click', throwDice);
  passButton.addEventListener('click', passTurn);
})();
