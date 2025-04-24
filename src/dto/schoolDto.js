/**
 * Data Transfer Object for school entities
 * Handles transformation and validation of school data between layers
 */
class SchoolDto {
  /**
   * Creates a new SchoolDto instance
   * 
   * @param {Object} data - School data to be encapsulated
   * @param {number} [data.id] - School ID (if available)
   * @param {string} data.name - School name
   * @param {string} data.address - School physical address
   * @param {number} data.latitude - Geographic latitude coordinate
   * @param {number} data.longitude - Geographic longitude coordinate
   * @param {number} [data.distance] - Distance from reference point (optional)
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    
    // Include distance property only if provided
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
  }
  
  /**
   * Creates a DTO from database entity
   * 
   * @param {Object} dbSchool - School record from database
   * @returns {SchoolDto} Formatted school DTO
   */
  static fromDB(dbSchool) {
    return new SchoolDto(dbSchool);
  }
  
  /**
   * Creates a data object from HTTP request body
   * Handles type conversion for numeric fields
   * 
   * @param {Object} reqBody - HTTP request body containing school data
   * @returns {Object} Formatted school data object ready for service layer
   */
  static fromRequest(reqBody) {
    return {
      name: reqBody.name,
      address: reqBody.address,
      latitude: parseFloat(reqBody.latitude),
      longitude: parseFloat(reqBody.longitude)
    };
  }
}

module.exports = SchoolDto;