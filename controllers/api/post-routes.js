const router = require('express').Router();
const { User, Post, Comment } = require('../../models/');   ///changed from { Comment }
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({        // POST BODY SENT IN REQUEST. HINT USING SPREAD
      title: req.body.title,                         // SET USERID TO LOGGEDIN USERID
      content: req.body.post_content,
      user_id: req.session.user_id
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {  //SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
      where: {
        id: req.params.id,
      },
      title: req.body.title,
      content: req.body.post_content
      
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => { //SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
