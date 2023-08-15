const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// POST route to create a new comment, requires authentication
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new comment using the Comment model
    const newComment = await Comment.create({
      ...req.body,          // Spread the request body as comment data
      userId: req.session.userId,  // Set the userId based on the authenticated user
    });
    res.json(newComment);   // Respond with the new comment data
  } catch (err) {
    res.status(500).json(err);  // If an error occurs, respond with a 500 status code and the error message
  }
});

module.exports = router;  // Export the router for use in other parts of the application