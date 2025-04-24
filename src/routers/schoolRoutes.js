const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

/**
 * POST endpoint to add a new school
 * @name POST/schools/addSchool
 * @function
 * @memberof module:routes/schoolRoutes
 */
router.post('/addSchool', schoolController.addSchool);

/**
 * GET endpoint to list schools sorted by proximity to given coordinates
 * @name GET/schools/listSchools
 * @function
 * @memberof module:routes/schoolRoutes
 */
router.get('/listSchools', schoolController.listSchools);

module.exports = router;