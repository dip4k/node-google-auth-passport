const router = require('express').Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  // res.send('On profile page : ' + req.user.username);
  res.render('profile', { user: req.user });
});

module.exports = router;
