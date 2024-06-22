const router = require("express").Router();
const { check } = require("express-validator")
const userControllers = require("../controllers/User.controller");
const validateFields = require("../helpers/validarCampos");
const isAuthenticated = require("../middlewares/isAuthenticated");

/**
 * @openapi
 * /api/user/getUser/{id}:
 *   get:
 *     summary: Obtener usuario
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id del usuario a obtener
 *         schema:
 *           type: string
 *     description: Obtener los datos de un usuario
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de la peticion
 *       400:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de error
 *       500:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Errores del servidor
 */
router.get("/getUser/:id", isAuthenticated, userControllers.getUser)


/**
 * @openapi
 * /api/user/editUser/{id}:
 *   put:
 *     summary: Editar usuario
 *     description: Editar un usuario especifico
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id del usuario a editar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de la peticion
 *       400:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de error
 *       500:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Errores del servidor
 */
router.put("/editUser/:id", [
    isAuthenticated,
    check("id", "El id del usuario es obligatorio o esta vacio").not().isEmpty(),
    validateFields,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("surname", "El apellido es obligatorio").not().isEmpty(),
    check("username", "El username de usuario es obligatorio").not().isEmpty(),
    check("mail", "El correo es obligatorio").not().isEmpty(),
    validateFields,
], userControllers.editUser)


/**
 * @openapi
 * /api/user/deleteUser/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     description: Eliminar un usuario especifico
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de la peticion
 *       400:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de error
 *       500:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Errores del servidor
 */
router.delete("/deleteUser/:id", [
    isAuthenticated,
    check("id", "El id es obligatorio o esta vacio").not().isEmpty(),
    validateFields,
], userControllers.deleteUser)


/**
 * @openapi
 * /api/user/deleteUser/{id}:
 *   delete:
 *     summary: Cambiar foto de perfil
 *     description: Cambiar la foto de perfil de un usuario
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de la peticion
 *       500:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Errores del servidor
 */
router.put("/changeProfile",userControllers.uploadImage)

module.exports = router;
