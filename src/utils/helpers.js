/**
 * Utility helper functions
 */
const Helpers = {
  /**
   * Format an error response
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @returns {Object} Formatted error response
   */
  errorResponse(message, statusCode = 500) {
    return {
      status: 'error',
      message,
      statusCode
    };
  },
  
  /**
   * Format a success response
   * @param {string} message - Success message
   * @param {*} data - Response data
   * @param {number} statusCode - HTTP status code
   * @returns {Object} Formatted success response
   */
  successResponse(message, data = null, statusCode = 200) {
    const response = {
      status: 'success',
      message,
      statusCode
    };
    
    if (data !== null) {
      response.data = data;
    }
    
    return response;
  }
};

module.exports = Helpers;
