const schoolService = require('../services/schoolService');
const { validateSchool, validateLocation } = require('../schemas/validator');
const { RESPONSES, HTTP_STATUS } = require('../utils/constants');
const SchoolDto = require('../dto/schoolDto');

/**
 * Handles HTTP requests related to school operations
 * Provides endpoints for creating and retrieving school information
 */
class SchoolController {
  /**
   * Creates a new school record in the database
   * 
   * @async
   * @param {Object} req - Express request object containing school data
   * @param {Object} req.body - School data in request body
   * @param {string} req.body.name - Name of the school
   * @param {string} req.body.address - Physical address of the school
   * @param {number|string} req.body.latitude - Latitude coordinate
   * @param {number|string} req.body.longitude - Longitude coordinate
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Object} JSON response with status and created school data
   * @throws {Error} Forwards any service errors to error handling middleware
   */
  async addSchool(req, res, next) {
    try {
      // Validate incoming school data against schema
      const { error, value } = validateSchool(req.body);
      if (error) {
        // Return early if validation fails with appropriate error message
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: RESPONSES.VALIDATION_ERROR,
          message: error.details[0].message
        });
      }
      
      // Transform request data to proper DTO format
      const schoolData = SchoolDto.fromRequest(value);
      
      // Delegate school creation to service layer
      const school = await schoolService.addSchool(schoolData);
      
      // Respond with success and the newly created school data
      return res.status(HTTP_STATUS.CREATED).json({
        status: RESPONSES.SUCCESS,
        message: 'School added successfully',
        data: school
      });
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  }
  
  /**
   * Retrieves schools sorted by proximity to provided coordinates
   * 
   * @async
   * @param {Object} req - Express request object
   * @param {Object} req.query - Query parameters
   * @param {string|number} req.query.latitude - Latitude for proximity calculation
   * @param {string|number} req.query.longitude - Longitude for proximity calculation
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Object} JSON response with status and sorted schools list
   * @throws {Error} Forwards any service errors to error handling middleware
   */
  async listSchools(req, res, next) {
    try {
      // Extract and parse location coordinates from query parameters
      const location = {
        latitude: parseFloat(req.query.latitude),
        longitude: parseFloat(req.query.longitude)
      };
      
      // Validate location data against schema
      const { error } = validateLocation(location);
      if (error) {
        // Return early if validation fails with appropriate error message
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: RESPONSES.VALIDATION_ERROR,
          message: error.details[0].message
        });
      }
      
      // Retrieve schools sorted by proximity using service layer
      const schools = await schoolService.listSchoolsByProximity(
        location.latitude, 
        location.longitude
      );
      
      // Respond with success and the sorted schools data
      return res.status(HTTP_STATUS.OK).json({
        status: RESPONSES.SUCCESS,
        message: 'Schools retrieved successfully',
        data: schools
      });
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  }
}

module.exports = new SchoolController();