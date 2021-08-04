const router = require('express').Router();
const session = require('express-session');
const { Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');



//create a new comment
router.post('/new/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_body: req.body.comment_body,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete comment  by post id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    
    res.status(200).json("");
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;