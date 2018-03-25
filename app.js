const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
// const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();

const passportSetup = require('./config/passport-setup');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const { mongoose } = require('./config/mongoose-conf');
const keys = require('./secret/keys');

// port
const port = process.env.PORT || 3000;

// middlewares ----->>>>>>

// view engine
app.set('view engine', 'ejs');

// serve public files
app.use(express.static(path.join(__dirname, '/public')));

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [keys.cookieSession.keys]
//   })
// );

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: keys.session.secret,
    resave: true,
    saveUninitialized: true
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes --->>>
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

// start server
app.listen(port, () => {
  console.log('server started on port 3000');
});
