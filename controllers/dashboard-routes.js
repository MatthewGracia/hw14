const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// Get all posts for the authenticated user
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    // Map and render posts with the dashboard layout
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    // Redirect to login page on error
    res.redirect('login');
  }
});

// Render the new post creation page
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

// Render the post editing page
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      // Post not found
      res.status(404).end();
    }
  } catch (err) {
    // Redirect to login page on error
    res.redirect('login');
  }
});

module.exports = router;