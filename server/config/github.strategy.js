//npm.package.homepage
const passport = require('passport');
const { Strategy } = require('passport-github2');
const debug = require('debug')('app:github.strategy');

const callback = process.env.npm_package_homepage + "github/auth/callback";

module.exports = function githubStrategy() {
  passport.use(new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackUrl: callback,
      passReqToCallback: true
    },
    ((req, accessToken, refreshToken, profile, done) => {
      debug(profile);
      const user = {
        profile,
        accessToken
      };
      return done(null, user);
    })
  ));
};