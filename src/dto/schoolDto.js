/**
 * Formats a school object for API response
 * @param {Object} school - Raw school data from database
 * @param {number} distance - Optional distance from user in kilometers
 * @returns {Object} Formatted school object
 */
function formatSchool(school, distance = null) {
  const formattedSchool = {
    id: school.id,
    name: school.name,
    address: school.address,
    coordinates: {
      latitude: school.latitude,
      longitude: school.longitude
    }
  };
  
  if (distance !== null) {
    formattedSchool.distance = {
      value: parseFloat(distance.toFixed(2)),
      unit: 'km'
    };
  }
  
  return formattedSchool;
}

/**
 * Creates a school object for database insertion
 * @param {Object} data - School data from request
 * @returns {Object} School object ready for database insertion
 */
function createSchoolDto(data) {
  return {
    name: data.name,
    address: data.address,
    latitude: data.latitude,
    longitude: data.longitude
  };
}

module.exports = {
  formatSchool,
  createSchoolDto
};
