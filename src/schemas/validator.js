const Joi = require('joi');

// School validation schema
const schoolSchema = Joi.object({
  name: Joi.string().required().min(2).max(255).messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name should have at least 2 characters',
    'any.required': 'Name is required'
  }),
  address: Joi.string().required().min(5).max(255).messages({
    'string.base': 'Address must be a string',
    'string.empty': 'Address is required',
    'string.min': 'Address should have at least 5 characters',
    'any.required': 'Address is required'
  }),
  latitude: Joi.number().required().min(-90).max(90).messages({
    'number.base': 'Latitude must be a number',
    'number.min': 'Latitude must be at least -90',
    'number.max': 'Latitude must be at most 90',
    'any.required': 'Latitude is required'
  }),
  longitude: Joi.number().required().min(-180).max(180).messages({
    'number.base': 'Longitude must be a number',
    'number.min': 'Longitude must be at least -180',
    'number.max': 'Longitude must be at most 180',
    'any.required': 'Longitude is required'
  })
});

// Location validation schema (for list schools query params)
const locationSchema = Joi.object({
  latitude: Joi.number().required().min(-90).max(90).messages({
    'number.base': 'Latitude must be a number',
    'number.min': 'Latitude must be at least -90',
    'number.max': 'Latitude must be at most 90',
    'any.required': 'Latitude is required'
  }),
  longitude: Joi.number().required().min(-180).max(180).messages({
    'number.base': 'Longitude must be a number',
    'number.min': 'Longitude must be at least -180',
    'number.max': 'Longitude must be at most 180',
    'any.required': 'Longitude is required'
  })
});

module.exports = {
  validateSchool: (school) => schoolSchema.validate(school),
  validateLocation: (location) => locationSchema.validate(location)
};