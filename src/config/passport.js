const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

passport.use(
  "login",
  new LocalStrategy(async function (username, password, done) {
    const findUser = await User.findOne({ username });
    const message = "El usuario o la clave son invalidos.";
    if (!findUser) return done(null, false, { message });
    const validatePassword = bcrypt.compareSync(password, findUser.password);
    if (!validatePassword) return done(null, false, { message });
    return done(null, findUser._id);
  })
);

passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const findUser = await User.findById(userId);
      if (!findUser) {
        return done(null, false);
      }
      const { password, status, google, ...userInfo } = findUser.toObject();
      done(null, userInfo);
    } catch (error) {
      done(error);
    }
  });
  

module.exports = passport;
