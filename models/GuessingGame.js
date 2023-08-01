// models/GuessingGame.js
const mongoose = require('mongoose');

const guessingGameSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  secretNumber: { type: String, required: true },
  guesses: [
    {
      guess: String,
      plus: Number,
      minus: Number,
    },
  ],
});

const GuessingGame = mongoose.model('GuessingGame', guessingGameSchema);

module.exports = GuessingGame;
