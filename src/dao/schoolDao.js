const db = require('../config/database');

/**
 * Data Access Object for Schools
 */
const SchoolDao = {
  /**
   * Add a new school to the database
   * @param {Object} schoolData - School data
   * @returns {Object} Created school with ID
   */
  async addSchool(schoolData) {
    try {
      const pool = await db.getConnection();
      const [result] = await pool.query(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [schoolData.name, schoolData.address, schoolData.latitude, schoolData.longitude]
      );
      
      // Get the created school
      const [schools] = await pool.query('SELECT * FROM schools WHERE id = ?', [result.insertId]);
      return schools[0];
    } catch (error) {
      console.error('Error in addSchool DAO:', error);
      throw error;
    }
  },
  
  /**
   * Get all schools from the database
   * @returns {Array} List of all schools
   */
  async getAllSchools() {
    try {
      const pool = await db.getConnection();
      const [schools] = await pool.query('SELECT * FROM schools');
      return schools;
    } catch (error) {
      console.error('Error in getAllSchools DAO:', error);
      throw error;
    }
  }
};

module.exports = SchoolDao;
