const express = require('express');
const router = express.Router();
const schoolRoutes = require('./routes/schoolRoutes');

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Mount school routes
router.use('/', schoolRoutes);

module.exports = router;
