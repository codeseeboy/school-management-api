let schoolDao = require("../dao/schoolDao");
let SchoolDto = require("../dto/schoolDto");
let { calculateDistance } = require("../utils/helpers");

/**
 * Service class for school operations
 */
class SchoolService {
  /**
   * Adds a new school to the database
   * @param {Object} schoolData - School data to be added
   * @param {string} schoolData.name - School name
   * @param {string} schoolData.address - School address
   * @param {number} schoolData.latitude - School latitude coordinate
   * @param {number} schoolData.longitude - School longitude coordinate
   * @returns {Promise<Object>} Created school DTO
   * @throws {Error} If school creation fails
   */
  async addSchool(schoolData) {
    try {
      // Validate required fields
      if (
        !schoolData.name ||
        !schoolData.address ||
        schoolData.latitude === undefined ||
        schoolData.longitude === undefined
      ) {
        throw new Error("Missing required school data fields");
      }

      // Create school record
      const school = await schoolDao.createSchool(schoolData);

      // Convert DB model to DTO and return
      return SchoolDto.fromDB(school);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lists all schools sorted by distance from given coordinates
   * @param {number} latitude - User's current latitude
   * @param {number} longitude - User's current longitude
   * @returns {Promise<Array>} Schools sorted by proximity (closest first)
   * @throws {Error} If listing schools fails
   */
  async listSchoolsByProximity(latitude, longitude) {
    try {
      // Validate coordinates
      if (latitude === undefined || longitude === undefined) {
        throw new Error("Missing coordinates for proximity calculation");
      }

      // Retrieve all schools from database
      const schools = await schoolDao.getAllSchools();

      // Calculate distance for each school from user's location
      const schoolsWithDistance = schools.map((school) => {
        // Calculate distance using Haversine formula
        const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);

        // Add distance to school object with 2 decimal precision
        return {
          ...school,
          distance: parseFloat(distance.toFixed(2)),
        };
      });

      // Sort schools by distance (ascending order)
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);

      // Convert each school to DTO format before returning
      return schoolsWithDistance.map((school) => SchoolDto.fromDB(school));
    } catch (error) {
      console.error("Error listing schools:", error);
      throw error;
    }
  }
}

// Export singleton instance
module.exports = new SchoolService();
