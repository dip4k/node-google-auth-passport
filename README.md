# Google authentication using oauth and passport

## use of middlewares and their order

======================================

* cookieParser
* session
* passport.initialize
* passport.session
* app.router

### Example usage

---

```js
var app = express();

app.use(require('serve-static')(__dirname + '/../../public'));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
```
