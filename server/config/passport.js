const express = require('express-session');
const passport = require('passport');
const debug = require('debug')('app:passport');


require('./github.strategy')();

module.exports = function pass(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
