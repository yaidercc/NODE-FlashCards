const router = require("express").Router();
const { check } = require("express-validator");
const validateFields = require("../helpers/validarCampos");
const authControllers = require("../controllers/Auth.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const validateJWT = require("../helpers/validateJWT");

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Loguear usuario
 *     description: Login con el usuario
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *                 example: "user"
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario logueado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 msg:
 *                   type: string
 *                   description: Mensaje de la peticion
 *       400:
 *         description: Error al loguear usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 errors:
 *                   type: object
 *                   description: Errores de la peticion
 */
router.post(
  "/login",
  [
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("password", "La clave es obligatoria").not().isEmpty(),
    validateFields,
  ],
  authControllers.login
);

/**
 * @openapi
 * /api/auth/singin:
 *   post:
 *     summary: Registrar usuario
 *     description: Registro de usuarios
 *     tags:
 *       - Auth
 *     produces:
 *        - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "juan"
 *                second_name:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "andres"
 *                surname:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "arboleda"
 *                second_surname:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "perez"
 *                username:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "elJuan"
 *                profile_img:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "https://example.com/profile.jpg"
 *                mail:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "juan@example.com"
 *                password:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "juan123"
 */
router.post(
  "/singup",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("surname", "El apellido es obligatorio").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("mail", "El correo es obligatorio").not().isEmpty(),
    check("password", "La clave es obligatoria").isStrongPassword(),
    validateFields,
  ],
  authControllers.singup
);

/**
 * @openapi
 * /api/auth/logout:
 *   get:
 *     summary: Cerrar sesion de un usuario
 *     description: Cierra la sesión del usuario
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Correo enviado con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 msg:
 *                   type: string
 *                   description: Mensaje de la peticion
 *       500:
 *         description: Error al enviar el correo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 */
router.get("/logout", authControllers.logout);

/**
 * @openapi
 * /api/auth/sendEmailToResetPassword:
 *   get:
 *     summary: Envia correo al usuario para cambio de clave
 *     description: Envia la url al usuario para que este pueda cambiar su clave
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Sesion cerrada con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 msg:
 *                   type: string
 *                   description: Mensaje de la peticion
 *       400:
 *         description: El usuario no existe o Correo no enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 msg:
 *                   type: string
 *                   description: Errores de la peticion
 *       500:
 *         description: Error al cerrar sesion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post(
  "/sendEmailToResetPassword",
  [check("mail", "El correo es incorrecto o esta vacio"), validateFields],
  authControllers.sendEmailToResetPassword
);

/**
 * @openapi
 * /api/auth/resetPassword:
 *   get:
 *     summary: Cambiar la contraseña de un usuario
 *     description: Cambiar la contraseña de un usuario por una nueva
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Contraeña cambiada con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 msg:
 *                   type: string
 *                   description: Mensaje de la peticion
 *       400:
 *         description: La clave esta vacia o Hubo un error al actualizar la clave
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 msg:
 *                   type: string
 *                   description: Errores de la petici
 *       500:
 *         description: Error al cambiar la contraseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post("/resetPassword", validateJWT, authControllers.resetPassword);


/**
 * @openapi
 * /api/auth/validateToken:
 *   get:
 *     summary: Validar token jwt
 *     description: Validar si el token para cambiar la contraseña aun esta vigente
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Token vigente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *       401:
 *         description: Token no valido o el usuario no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 msg:
 *                   type: string
 *                   description: Errores de la peticion
 */
router.get("/validateToken", validateJWT, (req, res) => {
  return res.json({
    success: true,
  });
});

router.get("/isAuthenticated", isAuthenticated, (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
