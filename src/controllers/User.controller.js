const userControllers = {};
module.exports = userControllers;
const User = require("../models/User");

userControllers.getUser = async (req, res) => {
  try {
    const { _id: user } = req.user;
    const { id } = req.params;

    if (id !== user.toString()) {
      return res.status(400).json({
        success: false,
        msg: "No autorizado.",
      });
    }

    const userinfo = await User.findById(id);

    const { google, password, __v, status, ...otherInfo } = userinfo._doc;

    return res.json({
      success: true,
      user: otherInfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

userControllers.editUser = async (req, res) => {
  try {
    const { first_name, surname, username, mail, password = "", google = "", ...otherInfo } = req.body;
    const { _id: user } = req.user;
    const { id } = req.params;

    if (id !== user.toString()) {
      return res.status(400).json({
        success: false,
        msg: "No autorizado.",
      });
    }

    const getUser = await User.findById(id);
    if (getUser.username != username) {
      const findByUsername = await User.findOne({ username });

      if (findByUsername) {
        return res.status(400).json({
          success: false,
          msg: "El nombre de usuario ya esta en uso.",
        });
      }
    }

    if (getUser.mail != mail) {
      const findByMail = await User.findOne({ mail });

      if (findByMail) {
        return res.status(400).json({
          success: false,
          msg: "El correo ya esta en uso.",
        });
      }
    }

    const { second_surname = null, second_name = null, profile_img = null } = otherInfo;

    const isEmpty = [
      !first_name.trim(),
      !surname.trim(),
      !username.trim(),
      !mail.trim(),
      second_surname && !second_surname?.trim(),
      second_name && !second_name?.trim(),
      profile_img && !profile_img?.trim(),
    ];

    if (isEmpty.some((field) => field)) {
      return res.status(400).json({
        success: false,
        msg: "Algunos de los campos estan vacios o son incorrectos.",
      });
    }

    await User.findByIdAndUpdate(id, {
      first_name,
      surname,
      username,
      mail,
      ...otherInfo,
    });

    return res.json({
      success: true,
      msg: "Usuario editado con exito.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

userControllers.deleteUser = async (req, res) => {
  try {
    const { _id: user } = req.user;
    const { id } = req.params;

    if (id !== user.toString()) {
      return res.status(400).json({
        success: false,
        msg: "No autorizado.",
      });
    }

    await User.findByIdAndDelete(id);

    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }
      return res.json({
        success: true,
        msg: "Usuario eliminado con exito."
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
