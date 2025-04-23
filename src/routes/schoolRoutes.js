const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const { validate, validators } = require('../middlewares/validator');

// Add School route
router.post('/addSchool', validate(validators.addSchool), schoolController.addSchool);

// List Schools route
router.get('/listSchools', validate(validators.listSchools), schoolController.listSchools);

module.exports = router;
