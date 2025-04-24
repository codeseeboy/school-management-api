/**
 * Application-wide constants for response messages and HTTP status codes
 * @module utils/constants
 */

/**
 * Standard response messages used throughout the application
 * @constant {Object}
 */
const RESPONSES = {
  SUCCESS: 'Success',
  FAILURE: 'Failure',
  NOT_FOUND: 'Not Found',
  VALIDATION_ERROR: 'Validation Error',
  SERVER_ERROR: 'Server Error'
};

/**
 * HTTP status codes used in API responses
 * @constant {Object}
 */
const HTTP_STATUS = {
  OK: 200,          // Successful request
  CREATED: 201,     // Resource created
  BAD_REQUEST: 400, // Invalid request
  NOT_FOUND: 404,   // Resource not found
  SERVER_ERROR: 500 // Internal server error
};

module.exports = {
  RESPONSES,
  HTTP_STATUS
};