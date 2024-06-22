const router = require("express").Router();
const { check } = require("express-validator");
const topicControllers = require("../controllers/Topic.controller");
const validateFields = require("../helpers/validarCampos");
const isAuthenticated = require("../middlewares/isAuthenticated");
/**
 * @openapi
 * /api/topic/getTopics:
 *   get:
 *     summary: Obtener temarios
 *     description: Obtener todos los temarios de un usuario
 *     tags:
 *        - Temarios
 *     responses:
 *      200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la peticion
 *                 topics:
 *                   type: object
 *                   description: Temarios consultados
 *      500:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la peticion
 *                 error:
 *                   type: object
 *                   description: Errores del servidor
 * 
 */
router.get("/getTopics", isAuthenticated, topicControllers.getTopics);


/**
 * @openapi
 * /api/topic/{id}:
 *   get:
 *     summary: Obtener temario
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id del temario a obtener
 *         schema:
 *           type: string
 *     description: Obtener un temario en especifico
 *     tags:
 *       - Temarios
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
 *                    description: Estado de la respuesta
 *                  topic:
 *                    type: object
 *                    description: Temario consultado
 *       400:
 *          description:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la respuesta
 *                  msg:
 *                    type: string
 *                    description: Mensaje de error
 *       500:
 *        description: 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Estado de la peticion
 *                error:
 *                  type: object
 *                  description: Errores del servidor
 */
router.get(
  "/:id",
    [
        isAuthenticated, 
        check("id", "El id del temario es incorrecto o esta vacio.").isMongoId(), 
        validateFields
    ],
  topicControllers.getTopic
);


/**
 * @openapi
 * /api/topic/createTopic:
 *   post:
 *     summary: Crear temario
 *     description: Crea un temario en especifico
 *     tags:
 *       - Temarios
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
 *                  topic:
 *                    type: object
 *                    description: Temario creado
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
router.post(
    "/createTopic",
        [
            isAuthenticated, 
            check("name", "El nombre del temario es incorrecto o esta vacio").not().isEmpty(), 
            validateFields
        ],
    topicControllers.createTopic
);

/**
 * @openapi
 * /api/topic/editTopic/{id}:
 *   put:
 *     summary: Editar temario
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id del temario a editar
 *         schema:
 *           type: string
 *     description: Edita un temario especifico
 *     tags:
 *       - Temarios
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
router.put(
  "/editTopic/:id",
    [
        isAuthenticated,
        check("id", "El id es incorrecto o esta vacio").isMongoId(),
        validateFields,
        check("name", "El nombre del temario es incorrecto o esta vacio").not().isEmpty(),
        validateFields
    ],
  topicControllers.editTopic
);

/**
 * @openapi
 * /api/topic/deleteTopic/{id}:
 *   delete:
 *     summary: Eliminar temario
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id del temario a eliminar
 *         schema:
 *           type: string
 *     description: Eliminar un temario especifico
 *     tags:
 *       - Temarios
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
router.delete(
  "/deleteTopic/:id",
  [
    isAuthenticated,
    check("id", "El id del temario es incorrecto o esta vacio.").isMongoId(),
    validateFields
  ],
  topicControllers.deleteTopic
);

module.exports = router;
