/**
 * Calculate distance between two geographical coordinates using the Haversine formula
 * @param {Number} lat1 - Latitude of first point in decimal degrees
 * @param {Number} lon1 - Longitude of first point in decimal degrees
 * @param {Number} lat2 - Latitude of second point in decimal degrees
 * @param {Number} lon2 - Longitude of second point in decimal degrees
 * @returns {Number} Distance between points in kilometers
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Earth's mean radius in kilometers
  const EARTH_RADIUS = 6371;
  
  // Convert latitude and longitude from degrees to radians
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = 
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * 
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  
  // Calculate central angle: c = 2 * atan2(√a, √(1-a))
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  // Final distance: d = R * c
  const distance = EARTH_RADIUS * c;
  
  return distance;
};

module.exports = {
  calculateDistance
};