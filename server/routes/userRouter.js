const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('../models/users');

const userRouter = express.Router();
userRouter.use(bodyParser.json());


userRouter.all((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  next();
});

userRouter.post('/register', (req, res) => {
  User.register(
    new User({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email}),
    req.body.password, 
    (err, user) => {
      if (err) {
        console.log(err);
        return res.json({ user : user });
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    }
  )
});

userRouter.get('/login', (req, res) => {
  res.json({success: true, status:"You are on the login page"});
});

userRouter.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({success: true, status: 'You are successfully logged in!'});
});

module.exports = userRouter;