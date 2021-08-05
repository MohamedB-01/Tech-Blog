const router = require('express').Router();
const session = require('express-session');
const { Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');




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

module.exports = router;