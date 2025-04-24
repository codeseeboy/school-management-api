const express = require('express');
const router = express.Router();
const schoolRoutes = require('./routers/schoolRoutes');

// School management routes
router.use('/api/schools', schoolRoutes);

module.exports = router;