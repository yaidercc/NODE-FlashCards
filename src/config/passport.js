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

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    const { password, status, google,...user } = findUser._doc;
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
