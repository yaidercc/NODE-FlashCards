const jwt = require("jsonwebtoken");

const generateJWT = (id = "", expiresTime = "12h") => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.JWTKEY,
      {
        expiresIn: expiresTime,
      },
      (err, token) => {
        if (err) {
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generateJWT;
