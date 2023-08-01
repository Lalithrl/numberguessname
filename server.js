// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Import routes
const guessingGameRoutes = require('./routes/guessingGameRoutes');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://lalithnumbergame:lalithnumbergame@game.gqxp22g.mongodb.net/?retryWrites=true&w=majority';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Use routes
app.use('/api', guessingGameRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
