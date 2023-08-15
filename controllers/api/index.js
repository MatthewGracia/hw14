const router = require('express').Router();

// Importing routes for different resources
const userRoutes = require('./user-routes.js');      // Import user routes
const postRoutes = require('./post-routes');         // Import post routes
const commentRoutes = require('./comment-routes');   // Import comment routes

// Middleware to handle routes related to different resources
router.use('/user', userRoutes);        // Set up routes under /user endpoint
router.use('/post', postRoutes);        // Set up routes under /post endpoint
router.use('/comment', commentRoutes);  // Set up routes under /comment endpoint

module.exports = router;  // Export the router to be used by the main application