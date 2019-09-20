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
  User.findById(id)
    .then(user => {
      done(null, user);
    })
})

// for the flow of passport see Explanation passportjs flow.png
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            // We already have a user record with this profile.id
            done(null, existingUser);
          } else {
            // We don't have a user record with this profile.id
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        });
    }
  )
);
