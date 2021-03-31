const router = require('express').Router();
const { Comment } = require('../../models/'); 
const withAuth = require('../../utils/auth');

// URL: /api/comment
router.post('/', withAuth, async (req, res) => {   
  try {
    const newComment = await Comment.create(
    {
      ...req.body,                  //COMMENT BODY IN REQUEST USING SPREAD, //SET USERID TO SESSION LOGGEDIN USERID
      userId: req.session.userId
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// if someone sends an HTTP PUT request to localhost:3001/api/comment/(insert number here)
router.put('/:id', (req, res) => {
  Comment.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    .then(commentData => {
      if(!commentData) {
        res.status(404).json({ message: "No comment found with this id"});
        return;
      }
    
    res.json(commentData);
  })
    .catch (err => {
    res.status(500).json(err);
  });

});

module.exports = router;

