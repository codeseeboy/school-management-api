const schoolService = require('../services/schoolService');

/**
 * School Controller - Handler for HTTP requests
 */
const SchoolController = {
  /**
   * Add a new school
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async addSchool(req, res, next) {
    try {
      const result = await schoolService.addSchool(req.body);
      
      res.status(201).json({
        status: 'success',
        message: 'School added successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * List schools sorted by proximity to user location
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async listSchools(req, res, next) {
    try {
      const { latitude, longitude } = req.query;
      
      // Convert string parameters to numbers
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      
      const schools = schoolService.listSchoolsByProximity(lat, lng);
      
      res.status(200).json({
        status: 'success',
        message: 'Schools retrieved successfully',
        data: schools
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = SchoolController;
