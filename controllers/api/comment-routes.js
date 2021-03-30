const router = require('express').Router();
const { Comment } = require('../../models/'); 
const withAuth = require('../../utils/auth');

// URL: /api/comment
router.post('/', withAuth, async (req, res) => {   
  try {
    const newComment = await Comment.create(
    {
      ...req.body,                  //COMMENT BODY IN REQUEST USING SPREAD, //SET USERID TO SESSION LOGGEDIN USERID
      userId: req.session.userId,
    })
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;






// previous - didnt work
//comment_text: req.body.comment_text,
//post_id: req.body.post_id,
//user_id: req.session.user_id,