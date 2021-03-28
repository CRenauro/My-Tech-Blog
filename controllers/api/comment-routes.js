const router = require('express').Router();
const { User, Post, Comment} = require('../../models/');  ///changed from { Comment }
const withAuth = require('../../utils/auth');

// URL: /api/comment
router.post('/', withAuth, async (req, res) => {    ///////newComment causing issue?
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//COMMENT BODY IN REQUEST USING SPREAD

//SET USERID TO SESSION LOGGEDIN USERID