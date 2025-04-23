const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

async function initialize() {
  try {
    // Connection pooling for better performance
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    
    // Test connection
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
    
    // Create schools table if not exists
    await createSchoolsTable();
    
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
}

async function createSchoolsTable() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await pool.query(createTableQuery);
    console.log('Schools table checked/created successfully');
  } catch (error) {
    console.error('Error creating schools table:', error.message);
    throw error;
  }
}

async function getConnection() {
  if (!pool) await initialize();
  return pool;
}

module.exports = {
  initialize,
  getConnection
};
