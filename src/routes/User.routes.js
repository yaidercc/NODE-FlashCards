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
 *     description: Obtener los datos de un usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: id
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
router.get("/getUser/:id", isAuthenticated, userControllers.getUser)


/**
 * @openapi
 * /api/flashcard/editUser/{id}:
 *   put:
 *     summary: Editar usuario
 *     description: Editar un usuario especifico
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *       - in: query
 *         name: id
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
    check("first_name", "El nombre es obligatorio").not().isEmpty(),
    check("surname", "El nombre es obligatorio").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("mail", "El correo es obligatorio").not().isEmpty(),
    validateFields,
], userControllers.editUser)


/**
 * @openapi
 * /api/flashcard/deleteUser/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     description: Eliminar un usuario especifico
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *       - in: query
 *         name: id
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

module.exports = router;
