const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({ ...req.body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(affectedRows > 0 ? 200 : 404).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const affectedRows = await Post.destroy({
      where: { id: req.params.id },
    });

    res.status(affectedRows > 0 ? 200 : 404).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;