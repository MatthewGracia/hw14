const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Define the Post model
class Post extends Model {}

// Initialize the Post model with its attributes and configuration
Post.init(
  {
    // Define the 'title' attribute with the DataTypes.STRING data type
    title: DataTypes.STRING,

    // Define the 'body' attribute with the DataTypes.STRING data type
    body: DataTypes.STRING
  },
  {
    sequelize // Provide the sequelize instance for database connection
  }
);

// Export the Post model
module.exports = Post;