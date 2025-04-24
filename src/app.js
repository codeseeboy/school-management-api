// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// import the other required modules
const express = require('express');
const cors = require('cors');
const routes = require('./route');
const { initializeDatabase } = require('./config/dbConfig');
const errorHandler = require('./middlewares/errorHandler');


// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Error handling middleware
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database
    await initializeDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;