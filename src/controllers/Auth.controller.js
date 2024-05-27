const authControllers = {};
module.exports = authControllers;
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passportAuth = require("../config/passport");
const sendEmail = require("../config/resend");
const generateJWT = require("../helpers/generateJWT");

authControllers.signin = async (req, res) => {
  try {
    const { first_name, surname, username, mail, password, ...otherInfo } = req.body;

    const findUserByUsername = await User.findOne({ username });
    const findUserByEmail = await User.findOne({ mail });

    if (findUserByUsername || findUserByEmail) {
      return res.status(400).json({
        success: false,
        msg: "El usuario ya existe.",
      });
    }
    const user = new User({
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

authControllers.login = (req, res, next) => {
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

authControllers.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ msg: "Error al cerrar sesión" });
    }
    return res.json({ msg: "Sesión cerrada exitosamente" });
  });
};

authControllers.sendEmailToResetPassword = async (req, res) => {
  try {
    const { mail } = req.body;

    const findUser = await User.findOne({ mail });

    if (!findUser) {
      return res.status(400).json({
        success: false,
        msg: "El usuario no existe.",
      });
    }

    const token = await generateJWT(findUser._id.toString(), "4h");
    const response = await sendEmail(
      "Recuperar contraseña",
      "contenido?",
      `
      <h1>Recuperar contraseña</h1>
      <p>Puedes usar ese link para recuprar tu contraseña: 
      <a href="http://localhost:4000/api/${token}">Click aqui</a>
      </p>
      `,
      mail
    );

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        msg: response.msg,
      });
    }

    return res.json({
      success: true,
      msg: "Correo enviado con exito.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

authControllers.resetPassword = async (req, res) => {
  try {
    const { _id } = req.userInfo;
    let { password } = req.body;

    if (!password.trim()) {
      return res.status(400).json({
        success: false,
        msg: "La clave esta vacia.",
      });
    }

    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    const response = await User.findByIdAndUpdate(_id, {
      password,
    });

    if (!response) {
      return res.status(400).json({
        success: false,
        msg: "Hubo un error al actualizar la clave",
      });
    }

    return res.json({
      success: true,
      msg: "Clave actualizada con exito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
