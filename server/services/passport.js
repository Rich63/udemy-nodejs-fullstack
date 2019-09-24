const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// for the explanation of this see explanation passport serializeUser method.png
passport.serializeUser((user, done) => {
  // user.id is the database id of logged in user see
  // Explanation using our own internal id in cookies.png
  done(null, user.id);
});

// id is the user.id from serializeUser above
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// for the flow of passport see Explanation passportjs flow.png
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true // To prevent error for authenticating and redircted to http insteaad https
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // We already have a user record with this profile.id
        return done(null, existingUser);
      }
      
      // We don't have a user record with this profile.id
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
