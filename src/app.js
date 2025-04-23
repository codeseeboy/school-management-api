const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./route');
const errorHandler = require('./middlewares/errorHandler');
const serverConfig = require('./config/server');
const db = require('./config/database');

// Initialize express app
const app = express();

// Apply middlewares
app.use(helmet());
app.use(cors(serverConfig.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply routes
app.use('/api', routes);

// Apply error handler
app.use(errorHandler);

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Initialize database and start server
const PORT = serverConfig.port;
async function startServer() {
  try {
    // Initialize database connection
    await db.initialize();
    
    // Start listening for requests
    app.listen(PORT, () => {
      console.log(`Server running in ${serverConfig.env} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app; // Export for testing