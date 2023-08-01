// routes/guessingGameRoutes.js
const express = require('express');
const router = express.Router();
const GuessingGame = require('../models/GuessingGame');

// Helper function to generate a random number with unique digits
function generateRandomNumber() {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let number = '';
  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * digits.length);
    number += digits[index];
    digits.splice(index, 1);
  }
  return number;
}

// Route to start a new game
router.post('/start', async (req, res) => {
  try {
    const playerName = req.body.playerName;
    const secretNumber = generateRandomNumber();
    const newGame = new GuessingGame({
      playerName,
      secretNumber,
      guesses: [],
    });
    await newGame.save();
    res.json({ message: 'New game started', gameId: newGame._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start a new game' });
  }
});

// Route to process guesses
router.post('/guess/:gameId', async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const guess = req.body.guess;
    const game = await GuessingGame.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Check the user's guess against the secret number
    let plus = 0;
    let minus = 0;
    for (let i = 0; i < 4; i++) {
      if (game.secretNumber[i] === guess[i]) {
        plus++;
      } else if (game.secretNumber.includes(guess[i])) {
        minus++;
      }
    }

    // Update the game with the new guess and results
    game.guesses.push({
      guess,
      plus,
      minus,
    });
    await game.save();

    // Check if the user guessed correctly
    if (plus === 4) {
      res.json({ message: 'Congratulations! You guessed the number!', guesses: game.guesses.length });
    } else {
      res.json({ plus, minus, guesses: game.guesses.length });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to process guess' });
  }
});

module.exports = router;
