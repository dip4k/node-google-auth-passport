const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const keys = require('../secret/keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile.id);

      User.findOne({ googleId: profile.id }).then(
        (currentUser) => {
          if (currentUser) {
            console.log('user exist: ', currentUser);
            return done(null, currentUser);
          } else {
            new User({
              username: profile.displayName,
              googleId: profile.id,
              thumbnail: profile._json.image.url
            })
              .save()
              .then(
                (user) => {
                  console.log('user created ' + user);
                  return done(null, user);
                },
                (err) => {
                  console.log(err);
                  return done(err);
                }
              );
          }
        },
        (err) => {
          return done(err);
        }
      );
    }
  )
);
