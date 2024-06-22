const authControllers = {};
module.exports = authControllers;

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passportAuth = require("../config/passport");
const sendEmail = require("../config/resend");
const generateJWT = require("../helpers/generateJWT");

authControllers.singup = async (req, res) => {
  try {
    const { name, surname, username, mail, password, ...otherInfo } = req.body;

    const findUserByUsername = await User.findOne({ username });
    const findUserByEmail = await User.findOne({ mail });

    if (findUserByUsername) {
      return res.status(409).json({
        success: false,
        code:409,
        msg: "El nombre de usuario ya existe.",
      });
    }

    if ( findUserByEmail) {
      return res.status(409).json({
        success: false,
        code:409,
        msg: "El correo ya existe.",
      });
    }
    const user = new User({
      name,
      surname,
      username,
      mail,
      password,
      profile_img: `https://ui-avatars.com/api/?name=${name}+${surname}&background=random&color=fff`,
      ...otherInfo,
    });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    return res.json({
      success: true,
      msg: "Registro exitoso.",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      code:500,
      msg:"Error en el servidor. Por favor, intenta de nuevo más tarde",
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
          code:400,
          errors,
        });

      req.logIn(user, async (err) => {
        if (err) return next(err);
        const { password, status, google,__v, ...userInfo } = user._doc
        return res.json({
          success: true,
          msg: "Inicio de sesion exitoso.",
          user:userInfo
        });
      });
    })(req, res, next)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      code:500,
      msg:"Error en el servidor. Por favor, intenta de nuevo más tarde",
    });
  }
};

authControllers.logout = (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ msg: "Error destroying session" });
      }
      res.clearCookie('connect.sid');
      
      return res.status(200).json({
        success: true,
        msg: "Logged out successfully"
      });
    });
  });
};


authControllers.sendEmailToResetPassword = async (req, res) => {
  try {
    const { mail } = req.body;

    const findUser = await User.findOne({ mail });

    if (!findUser) {
      return res.status(404).json({
        success: false,
        code:404,
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
      <a href="https://react-flashcards-gules.vercel.app/changePassword/${token}">Click aqui</a>
      </p>
      `,
      mail
    );

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        code:400,
        msg: response.msg,
      });
    }

    return res.json({
      success: true,
      msg: "Correo enviado con exito.",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      code:500,
      msg:"Error en el servidor. Por favor, intenta de nuevo más tarde",
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
        code:400,
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
        code:400,
        msg: "Hubo un error al actualizar la clave",
      });
    }

    return res.json({
      success: true,
      msg: "Clave actualizada con exito",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      code:500,
      msg:"Error en el servidor. Por favor, intenta de nuevo más tarde",
    });
  }
};
