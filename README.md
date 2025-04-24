# School Management API

## Overview
A RESTful API for managing school information with location-based functionality, built with Node.js and Express.

## Features
- **School Management**: Create and retrieve school records
- **Location-based Search**: Find schools near specified coordinates
- **Validation**: Robust input validation for all endpoints
- **Structured Architecture**: Clean separation of concerns

## Project Structure
```
src/
├── config/          # Configuration files
│   └── dbConfig.js  # Database configuration
├── controllers/     # Route controllers
│   └── schoolController.js
├── dao/             # Data access layer
│   └── schoolDao.js
├── dto/             # Data transfer objects
│   └── schoolDto.js
├── middlewares/     # Custom middleware
│   └── errorHandler.js
├── models/          # Database models
│   └── schoolModel.js
├── routers/         # Route definitions
│   └── schoolRoutes.js
├── schemas/         # Validation schemas
│   └── validator.js
├── services/        # Business logic
│   └── schoolService.js
└── utils/           # Utilities
    ├── constants.js
    └── helpers.js
```

## API Endpoints

### Add a School
**POST** `/api/schools/addSchool`
- Requires: name, address, latitude, longitude
- Returns: Created school record

### List Nearby Schools 
**GET** `/api/schools/listSchools`
- Parameters: latitude, longitude
- Returns: Schools ordered by distance

## Setup Instructions

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment**:
- Create `.env` file
- Set database credentials in `config/dbConfig.js`

3. **Run the application**:
```bash
# For production
npm start

# For development (with auto-restart)
npx nodemon src/app.js
```

## Requirements
- Node.js v14+
- MySQL database
- NPM packages:
  - Express
  - MySQL2
  - Joi (for validation)
  - Nodemon (dev dependency)

## Development Notes
- Follows MVC architecture pattern
- Uses async/await for database operations
- Includes comprehensive error handling
- Environment-based configuration

The API provides a solid foundation for school management systems with location-aware features.
