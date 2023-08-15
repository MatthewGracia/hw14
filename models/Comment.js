const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Assuming you have a config file for Sequelize

class Comment extends Model {}

// Initialize the Comment model with its attributes and configuration
Comment.init(
  {
    body: {
      type: DataTypes.STRING, // Data type of the 'body' field
      allowNull: false, // 'body' field cannot be null
    },
  },
  {
    sequelize, // Use the existing Sequelize instance
    modelName: 'comment', // The name of the table in the database
  }
);

module.exports = Comment;
