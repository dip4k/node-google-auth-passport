const router = require('express').Router();
const passport = require('passport');

// GET login page
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
  // handle with passport
  req.logout();
  res.redirect('/');
  // res.send('logging out');
});

// google auth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  res.redirect('/profile');
});

module.exports = router;
