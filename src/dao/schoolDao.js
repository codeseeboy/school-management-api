const { pool } = require('../config/dbConfig');

/**
 * Data Access Object for school-related database operations
 * Handles database interactions for school entities
 */
class SchoolDao {
  /**
   * Inserts a new school record into the database
   * 
   * @async
   * @param {Object} schoolData - School data to be inserted
   * @param {string} schoolData.name - School name
   * @param {string} schoolData.address - School physical address
   * @param {number} schoolData.latitude - Geographic latitude coordinate
   * @param {number} schoolData.longitude - Geographic longitude coordinate
   * @returns {Object} The newly created school record with generated ID
   * @throws {Error} Database-related errors during insertion or retrieval
   */
  async createSchool(schoolData) {
    try {
      // Execute insert query with parameterized values for security
      const [result] = await pool.execute(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [schoolData.name, schoolData.address, schoolData.latitude, schoolData.longitude]
      );
      
      // Retrieve the complete record of the newly inserted school
      const [schools] = await pool.execute('SELECT * FROM schools WHERE id = ?', [result.insertId]);
      
      // Return the first (and only) result
      return schools[0];
    } catch (error) {
      // Log error details for troubleshooting
      console.error('Error creating school:', error);
      throw error;
    }
  }
  
  /**
   * Retrieves all school records from the database
   * 
   * @async
   * @returns {Array<Object>} List of all school records
   * @throws {Error} Database-related errors during retrieval
   */
  async getAllSchools() {
    try {
      // Execute query to fetch all school records
      const [schools] = await pool.execute('SELECT * FROM schools');
      return schools;
    } catch (error) {
      // Log error details for troubleshooting
      console.error('Error getting schools:', error);
      throw error;
    }
  }
}

module.exports = new SchoolDao();