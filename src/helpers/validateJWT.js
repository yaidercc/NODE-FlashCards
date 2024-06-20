const jwt = require("jsonwebtoken");
const User = require("../models/User");


const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
       return res.json({
            ok: false,
            msg: "No hay token en la peticion."
        })
    }

    try {

        const {
            id
        } = jwt.verify(token, process.env.JWTKEY);

        // Buscar usuario
        const user = await User.findById(id)

        // Validar existencia del usuario
        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: "Usuario no existe"
            });
        }
        req.userInfo = user
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: "Token no valido."
        })
    }
}

module.exports = validarJWT