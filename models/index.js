const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Establish associations between models using Sequelize associations

// Each Post belongs to a User (author)
Post.belongsTo(User, {
  foreignKey: 'userId', // The foreign key field in the Post table referencing the User table
  onDelete: 'CASCADE', // If a User is deleted, their associated Posts should be deleted as well
});

// Each Post can have multiple Comments
Post.hasMany(Comment, {
  foreignKey: 'postId', // The foreign key field in the Comment table referencing the Post table
  onDelete: 'CASCADE', // If a Post is deleted, its associated Comments should be deleted as well
});

// Each Comment belongs to a User (author)
Comment.belongsTo(User, {
  foreignKey: 'userId', // The foreign key field in the Comment table referencing the User table
  onDelete: 'CASCADE', // If a User is deleted, their associated Comments should be deleted as well
});

// Export the models and their associations
module.exports = {
  User,
  Comment,
  Post,
};