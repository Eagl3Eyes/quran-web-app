const express = require('express');
const cors = require('cors');
require('dotenv').config();

const surahRoutes = require('./routes/surahRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', surahRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Quran API Backend is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
