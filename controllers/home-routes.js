const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// Get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User], // Include user data for each post
    });

    // Map and render posts with the all-posts layout
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post along with its user and comments
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User, // Include user data for the post
        {
          model: Comment,
          include: [User], // Include user data for each comment
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('single-post', { post });
    } else {
      // Post not found
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login page if not already logged in
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Render the signup page if not already logged in
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;