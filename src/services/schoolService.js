const schoolDao = require('../dao/schoolDao');
const schoolDto = require('../dto/schoolDto');

/**
 * School Service - Business Logic Layer
 */
const SchoolService = {
  /**
   * Add a new school
   * @param {Object} schoolData - School data from request
   * @returns {Object} Created school
   */
  async addSchool(schoolData) {
    try {
      const schoolToAdd = schoolDto.createSchoolDto(schoolData);
      const createdSchool = await schoolDao.addSchool(schoolToAdd);
      return schoolDto.formatSchool(createdSchool);
    } catch (error) {
      console.error('Error in addSchool service:', error);
      throw error;
    }
  },
  
  /**
   * List all schools sorted by distance to provided coordinates
   * @param {number} userLat - User latitude
   * @param {number} userLng - User longitude
   * @returns {Array} List of schools sorted by proximity
   */
  async listSchoolsByProximity(userLat, userLng) {
    try {
      // Get all schools
      const schools = await schoolDao.getAllSchools();
      
      // Calculate distance for each school and sort
      const schoolsWithDistance = schools.map(school => {
        const distance = calculateDistance(
          userLat, userLng,
          school.latitude, school.longitude
        );
        
        return {
          ...school,
          distance
        };
      });
      
      // Sort by distance
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);
      
      // Format with DTO
      return schoolsWithDistance.map(school => 
        schoolDto.formatSchool(school, school.distance)
      );
    } catch (error) {
      console.error('Error in listSchoolsByProximity service:', error);
      throw error;
    }
  }
};

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  // Earth's radius in kilometers
  const R = 6371;
  
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI/180);
}

module.exports = SchoolService;
