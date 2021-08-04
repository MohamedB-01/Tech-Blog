const router = require('express').Router();
const session = require('express-session');
const { Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

//create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});



// view a post by the post id and join with comment model and user model
router.get('/:id', async (req, res) => {

  req.session.loggedIn = true;

  try {
    const postData = await Post.findByPk(req.params.id, { 
      include: [ 
        { 
          model: Comment,
          attributes: [
            'id',
            'comment_body',
            'comment_date',
            'post_id',
            'user_id',
          ],
          include: [
            {
              model: User,
              attribtes: ['user_name']
            },
          ], 
        },
        {
          model: User,
          attributes: [
            'id',
            'user_name',
          ],
        },
      ],
    });

    const posts = postData.get({ plain: true });

    const  commentInfo = await Post.findByPk(req.params.id, { 
      include: [ 
        { 
          model: Comment,
          attributes: [
            'user_id',
          ],
        },
      ],
    });

    var currentUser = commentInfo.get({plain:true});

    res.render('updatePost', { 
      posts, 
      currentUser,
      sessUserId: req.session.user_id,
      logged_in: req.session.logged_in,
    });
    console.log(res);
  } catch (err) {
    res.status(500).json(err);
  };
});

//edit post by id 
router.put('/edit/:id', withAuth, async (req,res) => {
  try {

    const postData = await Post.update(
      {
        post_title: req.body.post_title,
        post_body: req.body.post_body,
      },
      {
      where: {
        id: req.params.id,
      }});

      res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// delete posts by post id
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
    res.render('posts', { postData });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;