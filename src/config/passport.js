const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

passport.use(
    new LocalStrategy(async function (username, password, done) {
        const findUser = await User.findOne({ username });
        const message = "El usuario o la clave son invalidos."

        if (!findUser) return done(null, false, { message });
        
        const validatePassword = bcrypt.compareSync(password, findUser.password);

        if (!validatePassword) return done(null, false, { message });
        
        return done(null, findUser);
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
