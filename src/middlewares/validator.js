const Joi = require('joi');

// Create validators
const validators = {
  // Validator for adding a school
  addSchool: Joi.object({
    name: Joi.string().required().min(1).max(255).messages({
      'string.empty': 'School name cannot be empty',
      'string.min': 'School name must be at least 1 character long',
      'string.max': 'School name cannot exceed 255 characters',
      'any.required': 'School name is required'
    }),
    address: Joi.string().required().min(5).max(255).messages({
      'string.empty': 'School address cannot be empty',
      'string.min': 'School address must be at least 5 characters long',
      'string.max': 'School address cannot exceed 255 characters',
      'any.required': 'School address is required'
    }),
    latitude: Joi.number().required().min(-90).max(90).messages({
      'number.base': 'Latitude must be a number',
      'number.min': 'Latitude must be at least -90',
      'number.max': 'Latitude cannot exceed 90',
      'any.required': 'Latitude is required'
    }),
    longitude: Joi.number().required().min(-180).max(180).messages({
      'number.base': 'Longitude must be a number',
      'number.min': 'Longitude must be at least -180',
      'number.max': 'Longitude cannot exceed 180',
      'any.required': 'Longitude is required'
    })
  }),
  
  // Validator for listing schools by proximity
  listSchools: Joi.object({
    latitude: Joi.number().required().min(-90).max(90).messages({
      'number.base': 'Latitude must be a number',
      'number.min': 'Latitude must be at least -90',
      'number.max': 'Latitude cannot exceed 90',
      'any.required': 'Latitude is required'
    }),
    longitude: Joi.number().required().min(-180).max(180).messages({
      'number.base': 'Longitude must be a number', 
      'number.min': 'Longitude must be at least -180',
      'number.max': 'Longitude cannot exceed 180',
      'any.required': 'Longitude is required'
    })
  })
};

// Middleware factory
const validate = (validator) => {
  return (req, res, next) => {
    const { error } = validator.validate(req.method === 'GET' ? req.query : req.body);
    
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message
      });
    }
    
    next();
  };
};

module.exports = {
  validate,
  validators
};
