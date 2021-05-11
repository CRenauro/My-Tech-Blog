const router = require('express').Router();
const { User, Comment, Post } = require('../../models'); ///changed from { User }

// URL: /api/user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,       // SET USERNAME TO USERNAME SENT IN REQUEST // SET PASSWORD TO PASSWORD SENT IN REQUEST
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id; //SET USERID IN REQUEST SESSION TO ID RETURNED FROM DATABASE
      req.session.username = newUser.username; //SET USERNAME IN REQUEST SESSION TO USERNAME RETURNED FROM DATABASE
      req.session.loggedIn = true; //SET LOGGEDIN TO TRUE IN REQUEST SESSION
      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// URL: /api/user/login
router.post('/login', async (req, res) => {
  try {
    const newUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!newUser) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }


    req.session.save(() => {
      req.session.userId = newUser.id; //SET USERID IN REQUEST SESSION TO ID RETURNED FROM DATABASE
      req.session.username = newUser.username; //SET USERNAME IN REQUEST SESSION TO USERNAME RETURNED FROM DATABASE
      req.session.loggedIn = true; //SET LOGGEDIN TO TRUE IN REQUEST SESSION

      res.json({ newUser, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

router.post('/post', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((newUser) => {
      if (!newUser) {
        res.status(404).json({ message: "No user found with that id!" });
        return;
      }
      res.json(newUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', (req, res) => {
  User.destroy({
      where: {
        id: req.params.id,
      },
  })
  .then(newUser => {
    if (!newUser) {
      res.status(404).json({ message: 'No user found with that id'});
      return;
    }
    res.json(newUser);
  })
    .catch (err => {
      res.status(500).json(err);
    })

});

module.exports = router;
