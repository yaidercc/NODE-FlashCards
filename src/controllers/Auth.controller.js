const auth = {};
module.exports = auth;
const bcrypt = require("bcryptjs");
const userModel = require("../models/User");
const passportAuth = require("../config/passport");

auth.signin = async (req, res) => {
  try {
    const { first_name, surname, username, mail, password, ...otherInfo } = req.body;

    const findUserByUsername = await userModel.findOne({ username });
    const findUserByEmail = await userModel.findOne({ mail });

    if (findUserByUsername || findUserByEmail) {
      return res.status(400).json({
        success: false,
        msg: "El usuario ya existe.",
      });
    }
    const user = new userModel({
      first_name,
      surname,
      username,
      mail,
      password,
      ...otherInfo,
    });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    return res.json({
      success: true,
      msg: "Registro exitoso.",
      user: {
        first_name,
        surname,
        username,
        mail,
        ...otherInfo,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

auth.login = (req, res, next) => {
  try {
    passportAuth.authenticate("login", (err, user, errors) => {
      if (err) return next(err);
      if (!user)
        return res.status(400).json({
          success: false,
          errors,
        });

      req.logIn(user, async (err) => {
        if (err) return next(err);
        console.log(req.isAuthenticated())
        return res.json({
          success: true,
          msg: "Inicio de sesion exitoso.",
        });
      });
    })(req, res, next);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

auth.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar sesión" });
    }
    return res.json({ message: "Sesión cerrada exitosamente" });
  });
};
