const router = require('express').Router();
const { Post, Comment, User } = require('../models/'); 

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});


// get single post
//url: localhost:3001/post/2
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {model: User,
        attributes: ["username"]}, /*Comment*/
        {
          model: Comment,
          include: [ {
            model: User,
            attributes: ["username"]
          } ]
        }

      ],
    });
    
    if (postData) {
      const post = postData.get({ plain: true });
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
      console.log(`Here's the post!: ${post}`);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
      res.render('single-post', { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
