const router = require("express").Router();
const { check } = require("express-validator");
const topicControllers = require("../controllers/Topic.controller");
const validateFields = require("../helpers/validarCampos");
const isAuthenticated = require("../middlewares/isAuthenticated");

/**
 * @openapi
 * /api/topic/{id}:
 *   get:
 *     summary: Obtener temario
 *     description: Obtener un temario en especifico
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
 * /api/topic/getTopics:
 *   get:
 *     summary: Obtener temarios
 *     description: Obtener todos los temarios de un usuario
 */
router.get("/getTopics", isAuthenticated, topicControllers.getTopics);

/**
 * @openapi
 * /api/topic/createTopic:
 *   get:
 *     summary: Crear temario
 *     description: Crea un temario en especifico
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
 *     description: Edita un temario especifico
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
 *     description: Eliminar un temario especifico
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
