// Import the Sequelize library
const Sequelize = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

// Create a connection to the database
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) // If using JAWSDB for production
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',       // Database host
      dialect: 'mysql',        // Database dialect (e.g., 'mysql')
      port: 3306              // Port on which the database is running
    });

// Export the created connection
module.exports = sequelize;
