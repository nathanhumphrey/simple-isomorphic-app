import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from '../db/models';

const options = { usernameField: 'email' };

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return db.User.findOne({ where: { id } })
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

passport.use(
  new LocalStrategy(options, (email, password, done) => {
    db.User.authenticate(email, password)
      .then(user => {
        if (user === null) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);
