const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts and JOIN with user data
router.get('/', async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




// route to dashboard page from dashboard link
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// route to dashboard after login
router.get('/login', (req, res) => {
  
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;